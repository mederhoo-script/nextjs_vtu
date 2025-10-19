import { NextRequest, NextResponse } from 'next/server';
import { getVTUClient } from '@/lib/vtuClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.network || !body.phone || !body.amount) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: network, phone, amount',
        },
        { status: 400 }
      );
    }

    // Validate amount
    if (typeof body.amount !== 'number' || body.amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Amount must be a positive number',
        },
        { status: 400 }
      );
    }

    const client = getVTUClient();
    const result = await client.purchaseAirtime({
      network: body.network,
      phone: body.phone,
      amount: body.amount,
    });
    
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Airtime API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to purchase airtime',
      },
      { status: 500 }
    );
  }
}
