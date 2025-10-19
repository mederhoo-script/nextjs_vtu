import { NextRequest, NextResponse } from 'next/server';
import { getVTUClient } from '@/lib/vtuClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.service_type || !body.billersCode) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: service_type, billersCode',
        },
        { status: 400 }
      );
    }

    const client = getVTUClient();
    const result = await client.verifyCustomer({
      service_type: body.service_type,
      billersCode: body.billersCode,
      variation_code: body.variation_code,
    });
    
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Verify customer API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to verify customer',
      },
      { status: 500 }
    );
  }
}
