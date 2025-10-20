import { NextRequest, NextResponse } from 'next/server';
import { getVTUClient } from '@/lib/vtuClient';
import { validateApiKey } from '@/lib/apiKeyValidation';

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    
    // Validate required fields
    if (!body.service_type || !body.billersCode || !body.variation_code || !body.phone) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: service_type, billersCode, variation_code, phone',
        },
        { status: 400 }
      );
    }

    const client = getVTUClient();
    const result = await client.purchaseTV({
      service_type: body.service_type,
      billersCode: body.billersCode,
      variation_code: body.variation_code,
      phone: body.phone,
    });
    
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('TV API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to purchase TV subscription',
      },
      { status: 500 }
    );
  }
}
