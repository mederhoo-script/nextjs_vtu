/**
 * VTU.ng API v2 Client
 * Base URL: https://vtu.ng/wp-json
 * 
 * This client handles authentication, token management, and API calls
 * to the VTU.ng API endpoints.
 */

export interface VTUClientConfig {
  baseUrl: string;
  username: string;
  password: string;
  userPin: string;
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

// Generic API response interface
export interface VTUApiResponse {
  success?: boolean;
  message?: string;
  data?: Record<string, unknown>;
  [key: string]: unknown;
}

export class VTUClient {
  private baseUrl: string;
  private username: string;
  private password: string;
  private userPin: string;
  private cachedToken: string | null = null;
  private tokenExpiry: number | null = null;

  constructor(config: VTUClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.username = config.username;
    this.password = config.password;
    this.userPin = config.userPin;
  }

  /**
   * Get access token (with caching)
   * Automatically refreshes token if expired
   */
  async getAccessToken(): Promise<string> {
    // Check if we have a valid cached token
    if (this.cachedToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.cachedToken;
    }

    // Request new token
    const response = await fetch(`${this.baseUrl}/wp/v2/users/login`, {
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
      throw new Error(`Failed to get access token: ${response.status} - ${errorText}`);
    }

    const data: TokenResponse = await response.json();
    
    // Cache the token (default expiry: 1 hour if not specified)
    this.cachedToken = data.token;
    const expiresIn = data.expires_in || 3600;
    this.tokenExpiry = Date.now() + (expiresIn * 1000) - 60000; // Refresh 1 min before expiry

    return this.cachedToken;
  }

  /**
   * Make authenticated API request
   */
  private async makeRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' = 'GET',
    body?: Record<string, unknown> | AirtimeRequest | DataRequest | VerifyCustomerRequest | ElectricityRequest | BettingRequest | TVRequest | EpinsRequest | RequeryRequest
  ): Promise<T> {
    const token = await this.getAccessToken();

    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body && method === 'POST') {
      options.body = JSON.stringify({
        ...body,
        user_pin: this.userPin,
      });
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    return await response.json();
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

  if (!baseUrl || !username || !password || !userPin) {
    throw new Error(
      'Missing required VTU environment variables. Please check VTU_BASE_URL, VTU_USERNAME, VTU_PASSWORD, and VTU_USER_PIN.'
    );
  }

  return new VTUClient({
    baseUrl,
    username,
    password,
    userPin,
  });
}
