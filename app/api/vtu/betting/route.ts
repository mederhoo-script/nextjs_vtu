import { NextRequest, NextResponse } from 'next/server';
import { getVTUClient } from '@/lib/vtuClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.service_type || !body.billersCode || !body.amount || !body.phone) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: service_type, billersCode, amount, phone',
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
    const result = await client.fundBetting({
      service_type: body.service_type,
      billersCode: body.billersCode,
      amount: body.amount,
      phone: body.phone,
    });
    
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Betting API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fund betting account',
      },
      { status: 500 }
    );
  }
}
