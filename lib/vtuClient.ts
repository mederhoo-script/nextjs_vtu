/**
 * VTU.ng API v2 Client
 * Base URL: https://vtu.ng/wp-json
 * 
 * This client handles authentication, token management, and API calls
 * to the VTU.ng API endpoints.
 * 
 * Features:
 * - JWT authentication with automatic token refresh
 * - Token caching to minimize API calls
 * - Comprehensive error handling with VTU error codes
 * - Retry logic for transient errors (wallet busy, rate limit)
 * - Timeout support for all requests
 */

export interface VTUClientConfig {
  baseUrl: string;
  username: string;
  password: string;
  userPin?: string;
  apiKey?: string;
  timeout?: number; // Request timeout in milliseconds (default: 30000)
  maxRetries?: number; // Max retry attempts for transient errors (default: 3)
}

export interface TokenResponse {
  token: string;
  expires_in?: number;
}

export interface BalanceResponse {
  balance: string | number;
  bonus?: string | number;
}

export interface AirtimeRequest {
  network: string;
  phone: string;
  amount: number;
}

export interface DataRequest {
  network: string;
  phone: string;
  variation_code: string;
}

export interface VariationsRequest {
  service_type: 'data' | 'tv';
}

export interface VerifyCustomerRequest {
  service_type: string;
  billersCode: string;
  variation_code?: string;
}

export interface ElectricityRequest {
  service_type: string;
  billersCode: string;
  variation_code: string;
  amount: number;
  phone: string;
}

export interface BettingRequest {
  service_type: string;
  billersCode: string;
  amount: number;
  phone: string;
}

export interface TVRequest {
  service_type: string;
  billersCode: string;
  variation_code: string;
  phone: string;
}

export interface EpinsRequest {
  service_type: string;
  amount: number;
  quantity: number;
}

export interface RequeryRequest {
  request_id: string;
}

export interface TransactionHistoryRequest {
  page?: number;
  limit?: number;
  status?: string;
}

export interface RechargeCardRequest {
  network: string;
  amount: number;
  quantity: number;
  pin_type?: string;
}

// Generic API response interface
export interface VTUApiResponse {
  success?: boolean;
  message?: string;
  data?: Record<string, unknown>;
  code?: string;
  error?: string;
  [key: string]: unknown;
}

// VTU Error interface
export interface VTUError extends Error {
  code?: string;
  status?: number;
  isRetryable?: boolean;
}

export class VTUClient {
  private baseUrl: string;
  private username: string;
  private password: string;
  private userPin?: string;
  private apiKey?: string;
  private timeout: number;
  private maxRetries: number;
  private cachedToken: string | null = null;
  private tokenExpiry: number | null = null;

  constructor(config: VTUClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.username = config.username;
    this.password = config.password;
    this.userPin = config.userPin;
    this.apiKey = config.apiKey;
    this.timeout = config.timeout || 30000; // Default 30 seconds
    this.maxRetries = config.maxRetries || 3;
  }

  /**
   * Create a VTU error from response
   */
  private createError(message: string, code?: string, status?: number, isRetryable = false): VTUError {
    const error = new Error(message) as VTUError;
    error.code = code;
    error.status = status;
    error.isRetryable = isRetryable;
    return error;
  }

  /**
   * Check if error is retryable (transient errors like wallet busy, rate limit)
   */
  private isRetryableError(error: unknown): boolean {
    if (error instanceof Error) {
      const message = error.message.toLowerCase();
      return (
        message.includes('wallet busy') ||
        message.includes('rate limit') ||
        message.includes('timeout') ||
        message.includes('network error') ||
        message.includes('econnreset') ||
        message.includes('etimedout')
      );
    }
    return false;
  }

  /**
   * Sleep for specified milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Fetch with timeout support
   */
  private async fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if ((error as Error).name === 'AbortError') {
        throw this.createError(`Request timeout after ${this.timeout}ms`, 'TIMEOUT', 408, true);
      }
      throw error;
    }
  }

  /**
   * Get access token (with caching)
   * Automatically refreshes token if expired
   * Supports both JWT auth endpoints
   */
  async getAccessToken(): Promise<string> {
    // Check if we have a valid cached token
    if (this.cachedToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.cachedToken;
    }

    // Try JWT auth endpoint first (as per problem statement)
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/jwt-auth/v1/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      });

      if (response.ok) {
        const data: TokenResponse = await response.json();
        this.cachedToken = data.token;
        const expiresIn = data.expires_in || 3600;
        this.tokenExpiry = Date.now() + (expiresIn * 1000) - 60000; // Refresh 1 min before expiry
        return this.cachedToken;
      }
    } catch (error) {
      // Fallback to alternative endpoint
      console.warn('JWT auth endpoint failed, trying fallback:', error);
    }

    // Fallback to alternative endpoint
    const response = await this.fetchWithTimeout(`${this.baseUrl}/wp/v2/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.username,
        password: this.password,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw this.createError(`Failed to get access token: ${response.status} - ${errorText}`, 'AUTH_FAILED', response.status);
    }

    const data: TokenResponse = await response.json();
    
    // Cache the token (default expiry: 1 hour if not specified)
    this.cachedToken = data.token;
    const expiresIn = data.expires_in || 3600;
    this.tokenExpiry = Date.now() + (expiresIn * 1000) - 60000; // Refresh 1 min before expiry

    return this.cachedToken;
  }

  /**
   * Make authenticated API request with retry logic
   */
  private async makeRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' = 'GET',
    body?: Record<string, unknown> | AirtimeRequest | DataRequest | VerifyCustomerRequest | ElectricityRequest | BettingRequest | TVRequest | EpinsRequest | RequeryRequest | TransactionHistoryRequest | RechargeCardRequest
  ): Promise<T> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const token = await this.getAccessToken();

        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };

        // Add authorization based on available credentials
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        if (this.apiKey) {
          headers['Authorization'] = `Token ${this.apiKey}`;
        }

        const options: RequestInit = {
          method,
          headers,
        };

        if (body && method === 'POST') {
          const requestBody: Record<string, unknown> = { ...body };
          // Only add user_pin if it's defined
          if (this.userPin) {
            requestBody.user_pin = this.userPin;
          }
          options.body = JSON.stringify(requestBody);
        }

        const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, options);

        if (!response.ok) {
          let errorData: VTUApiResponse | null = null;
          let errorText = '';
          
          try {
            errorData = await response.json();
            if (errorData) {
              errorText = errorData.message || errorData.error || JSON.stringify(errorData);
            }
          } catch {
            errorText = await response.text();
          }

          const error = this.createError(
            `API request failed: ${response.status} - ${errorText}`,
            errorData?.code,
            response.status,
            this.isRetryableError(new Error(errorText))
          );

          // If it's a retryable error and we have attempts left, retry
          if (error.isRetryable && attempt < this.maxRetries) {
            const backoffMs = Math.min(1000 * Math.pow(2, attempt - 1), 10000); // Exponential backoff, max 10s
            console.warn(`Request failed (attempt ${attempt}/${this.maxRetries}), retrying in ${backoffMs}ms...`);
            await this.sleep(backoffMs);
            lastError = error;
            continue;
          }

          throw error;
        }

        const responseData = await response.json();
        
        // Check if VTU API returned an error in the response body
        if (responseData.success === false || responseData.error) {
          const errorMessage = responseData.message || responseData.error || 'Unknown API error';
          throw this.createError(errorMessage, responseData.code, response.status);
        }

        return responseData as T;
      } catch (error) {
        lastError = error as Error;
        
        // If it's not retryable or last attempt, throw
        if (!this.isRetryableError(error) || attempt === this.maxRetries) {
          throw error;
        }

        // Retry with backoff
        const backoffMs = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
        console.warn(`Request failed (attempt ${attempt}/${this.maxRetries}), retrying in ${backoffMs}ms...`);
        await this.sleep(backoffMs);
      }
    }

    // Should not reach here, but just in case
    throw lastError || this.createError('Request failed after maximum retries', 'MAX_RETRIES_EXCEEDED');
  }

  /**
   * Get account balance
   */
  async getBalance(): Promise<BalanceResponse> {
    return this.makeRequest<BalanceResponse>('/api/v1/balance', 'GET');
  }

  /**
   * Purchase airtime
   */
  async purchaseAirtime(data: AirtimeRequest): Promise<VTUApiResponse> {
    return this.makeRequest('/api/v1/airtime', 'POST', data);
  }

  /**
   * Purchase data bundle
   */
  async purchaseData(data: DataRequest): Promise<VTUApiResponse> {
    return this.makeRequest('/api/v1/data', 'POST', data);
  }

  /**
   * Get variations (data plans or TV packages)
   */
  async getVariations(params: VariationsRequest): Promise<VTUApiResponse> {
    return this.makeRequest(
      `/api/v1/variations?service_type=${params.service_type}`,
      'GET'
    );
  }

  /**
   * Verify customer details
   */
  async verifyCustomer(data: VerifyCustomerRequest): Promise<VTUApiResponse> {
    return this.makeRequest('/api/v1/verify-customer', 'POST', data);
  }

  /**
   * Purchase electricity
   */
  async purchaseElectricity(data: ElectricityRequest): Promise<VTUApiResponse> {
    return this.makeRequest('/api/v1/electricity', 'POST', data);
  }

  /**
   * Fund betting account
   */
  async fundBetting(data: BettingRequest): Promise<VTUApiResponse> {
    return this.makeRequest('/api/v1/betting', 'POST', data);
  }

  /**
   * Purchase TV subscription
   */
  async purchaseTV(data: TVRequest): Promise<VTUApiResponse> {
    return this.makeRequest('/api/v1/tv', 'POST', data);
  }

  /**
   * Purchase e-pins
   */
  async purchaseEpins(data: EpinsRequest): Promise<VTUApiResponse> {
    return this.makeRequest('/api/v1/epins', 'POST', data);
  }

  /**
   * Requery transaction
   */
  async requeryTransaction(data: RequeryRequest): Promise<VTUApiResponse> {
    return this.makeRequest('/api/v1/requery', 'POST', data);
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(params?: TransactionHistoryRequest): Promise<VTUApiResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    
    const query = queryParams.toString();
    const endpoint = query ? `/api/v1/transactions?${query}` : '/api/v1/transactions';
    
    return this.makeRequest(endpoint, 'GET');
  }

  /**
   * Generate recharge cards
   */
  async generateRechargeCards(data: RechargeCardRequest): Promise<VTUApiResponse> {
    return this.makeRequest('/api/v1/recharge-cards', 'POST', data);
  }

  /**
   * Clear cached token (useful for testing or forced refresh)
   */
  clearTokenCache(): void {
    this.cachedToken = null;
    this.tokenExpiry = null;
  }
}

/**
 * Get VTU client instance from environment variables
 */
export function getVTUClient(): VTUClient {
  const baseUrl = process.env.VTU_BASE_URL;
  const username = process.env.VTU_USERNAME;
  const password = process.env.VTU_PASSWORD;
  const userPin = process.env.VTU_USER_PIN;
  const apiKey = process.env.VTU_API_KEY;

  if (!baseUrl || !username || !password) {
    throw new Error(
      'Missing required VTU environment variables. Please check VTU_BASE_URL, VTU_USERNAME, and VTU_PASSWORD.'
    );
  }

  return new VTUClient({
    baseUrl,
    username,
    password,
    userPin,
    apiKey,
    timeout: parseInt(process.env.VTU_TIMEOUT || '30000', 10),
    maxRetries: parseInt(process.env.VTU_MAX_RETRIES || '3', 10),
  });
}
