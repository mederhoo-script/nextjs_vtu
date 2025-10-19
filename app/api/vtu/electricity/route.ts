import { NextRequest, NextResponse } from 'next/server';
import { getVTUClient } from '@/lib/vtuClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.service_type || !body.billersCode || !body.variation_code || !body.amount || !body.phone) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: service_type, billersCode, variation_code, amount, phone',
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
    const result = await client.purchaseElectricity({
      service_type: body.service_type,
      billersCode: body.billersCode,
      variation_code: body.variation_code,
      amount: body.amount,
      phone: body.phone,
    });
    
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Electricity API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to purchase electricity',
      },
      { status: 500 }
    );
  }
}
