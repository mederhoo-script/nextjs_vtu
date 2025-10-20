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
    if (!body.network || !body.amount || !body.quantity) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: network, amount, quantity',
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

    // Validate quantity
    if (typeof body.quantity !== 'number' || body.quantity <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Quantity must be a positive number',
        },
        { status: 400 }
      );
    }

    const client = getVTUClient();
    const result = await client.generateRechargeCards({
      network: body.network,
      amount: body.amount,
      quantity: body.quantity,
      pin_type: body.pin_type,
    });
    
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Recharge cards API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate recharge cards',
      },
      { status: 500 }
    );
  }
}
