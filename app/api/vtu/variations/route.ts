import { NextRequest, NextResponse } from 'next/server';
import { getVTUClient } from '@/lib/vtuClient';
import { validateApiKey } from '@/lib/apiKeyValidation';

export async function GET(request: NextRequest) {
  try {
    // Validate API key
    if (!validateApiKey(request)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized: Invalid or missing API key',
        },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const serviceType = searchParams.get('service_type');
    
    // Validate service type
    if (!serviceType || (serviceType !== 'data' && serviceType !== 'tv')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid service_type. Must be "data" or "tv"',
        },
        { status: 400 }
      );
    }

    const client = getVTUClient();
    const result = await client.getVariations({
      service_type: serviceType as 'data' | 'tv',
    });
    
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Variations API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch variations',
      },
      { status: 500 }
    );
  }
}
