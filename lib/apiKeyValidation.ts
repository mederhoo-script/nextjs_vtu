import { NextRequest } from 'next/server';

/**
 * Validate API key if configured
 * Returns true if validation passes (or if no API key is configured)
 * Returns false if API key is configured but validation fails
 */
export function validateApiKey(request: NextRequest): boolean {
  const serverApiKey = process.env.VTU_SERVER_API_KEY;
  
  // If no API key configured, allow all requests
  if (!serverApiKey) {
    return true;
  }
  
  // Check for API key in headers
  const requestApiKey = request.headers.get('x-api-key');
  
  return requestApiKey === serverApiKey;
}
