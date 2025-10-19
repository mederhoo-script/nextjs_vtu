import { NextRequest, NextResponse } from 'next/server';
import { getVTUClient } from '@/lib/vtuClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.network || !body.phone || !body.variation_code) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: network, phone, variation_code',
        },
        { status: 400 }
      );
    }

    const client = getVTUClient();
    const result = await client.purchaseData({
      network: body.network,
      phone: body.phone,
      variation_code: body.variation_code,
    });
    
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Data API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to purchase data',
      },
      { status: 500 }
    );
  }
}
