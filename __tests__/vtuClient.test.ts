/**
 * VTUApiClient Tests
 * 
 * These tests demonstrate how to test the VTUApiClient with mocked fetch.
 * To run these tests, you'll need to install Jest and related dependencies:
 * 
 * npm install --save-dev jest @types/jest ts-jest
 * 
 * Then add to package.json:
 * "scripts": {
 *   "test": "jest",
 *   "test:watch": "jest --watch"
 * }
 * 
 * Create jest.config.js:
 * module.exports = {
 *   preset: 'ts-jest',
 *   testEnvironment: 'node',
 *   moduleNameMapper: {
 *     '^@/(.*)$': '<rootDir>/$1',
 *   },
 * };
 */

import { VTUClient } from '../lib/vtuClient';

// Mock fetch globally
global.fetch = jest.fn();

describe('VTUClient', () => {
  let client: VTUClient;
  
  beforeEach(() => {
    // Reset fetch mock before each test
    (global.fetch as jest.Mock).mockClear();
    
    // Create client instance
    client = new VTUClient({
      baseUrl: 'https://vtu.ng/wp-json',
      username: 'testuser',
      password: 'testpass',
      userPin: '1234',
      timeout: 5000,
      maxRetries: 2,
    });
  });

  describe('Authentication', () => {
    it('should authenticate with JWT endpoint', async () => {
      // Mock successful JWT auth response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          token: 'test-jwt-token',
          expires_in: 3600,
        }),
      });

      const token = await client.getAccessToken();
      
      expect(token).toBe('test-jwt-token');
      expect(global.fetch).toHaveBeenCalledWith(
        'https://vtu.ng/wp-json/jwt-auth/v1/token',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });

    it('should fallback to alternative endpoint if JWT fails', async () => {
      // Mock JWT failure
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('JWT endpoint not found'));
      
      // Mock successful fallback
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          token: 'fallback-token',
          expires_in: 3600,
        }),
      });

      const token = await client.getAccessToken();
      
      expect(token).toBe('fallback-token');
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('should cache token and reuse it', async () => {
      // Mock auth response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          token: 'cached-token',
          expires_in: 3600,
        }),
      });

      // First call should authenticate
      const token1 = await client.getAccessToken();
      expect(token1).toBe('cached-token');
      expect(global.fetch).toHaveBeenCalledTimes(1);

      // Second call should use cached token
      const token2 = await client.getAccessToken();
      expect(token2).toBe('cached-token');
      expect(global.fetch).toHaveBeenCalledTimes(1); // No additional calls
    });
  });

  describe('Balance Operations', () => {
    it('should fetch balance successfully', async () => {
      // Mock auth
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: 'test-token' }),
      });

      // Mock balance response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          balance: '1000.00',
          bonus: '50.00',
        }),
      });

      const balance = await client.getBalance();
      
      expect(balance.balance).toBe('1000.00');
      expect(balance.bonus).toBe('50.00');
    });
  });

  describe('Airtime Purchase', () => {
    it('should purchase airtime successfully', async () => {
      // Mock auth
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: 'test-token' }),
      });

      // Mock airtime purchase response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'Airtime purchase successful',
          data: {
            request_id: '12345',
            amount: 100,
            network: 'mtn',
          },
        }),
      });

      const result = await client.purchaseAirtime({
        network: 'mtn',
        phone: '08012345678',
        amount: 100,
      });
      
      expect(result.success).toBe(true);
      expect(result.message).toBe('Airtime purchase successful');
    });

    it('should validate required fields', async () => {
      // Mock auth
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: 'test-token' }),
      });

      // Mock validation error response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({
          success: false,
          error: 'Missing required field: phone',
        }),
      });

      await expect(
        client.purchaseAirtime({
          network: 'mtn',
          phone: '',
          amount: 100,
        })
      ).rejects.toThrow();
    });
  });

  describe('Error Handling', () => {
    it('should retry on transient errors', async () => {
      // Mock auth
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: 'test-token' }),
      });

      // First attempt fails with wallet busy
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Wallet busy, please try again' }),
      });

      // Second attempt succeeds
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, balance: '1000.00' }),
      });

      const balance = await client.getBalance();
      
      expect(balance.balance).toBe('1000.00');
      expect(global.fetch).toHaveBeenCalledTimes(3); // Auth + 2 balance attempts
    });

    it('should timeout after configured duration', async () => {
      // Mock auth
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: 'test-token' }),
      });

      // Mock slow response
      (global.fetch as jest.Mock).mockImplementationOnce(() => 
        new Promise((resolve) => {
          setTimeout(() => resolve({ ok: true }), 10000); // 10 seconds
        })
      );

      await expect(client.getBalance()).rejects.toThrow(/timeout/i);
    });
  });

  describe('Data Purchase', () => {
    it('should purchase data bundle successfully', async () => {
      // Mock auth
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: 'test-token' }),
      });

      // Mock data purchase response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'Data purchase successful',
          data: {
            request_id: '67890',
            variation_code: 'mtn-1gb',
          },
        }),
      });

      const result = await client.purchaseData({
        network: 'mtn',
        phone: '08012345678',
        variation_code: 'mtn-1gb',
      });
      
      expect(result.success).toBe(true);
    });
  });

  describe('Variations', () => {
    it('should fetch data variations', async () => {
      // Mock auth
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: 'test-token' }),
      });

      // Mock variations response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          content: [
            { variation_code: 'mtn-1gb', name: '1GB', variation_amount: '300' },
            { variation_code: 'mtn-2gb', name: '2GB', variation_amount: '550' },
          ],
        }),
      });

      const result = await client.getVariations({ service_type: 'data' });
      
      expect(result.content).toHaveLength(2);
      expect(result.content[0].variation_code).toBe('mtn-1gb');
    });
  });
});
