import { NextResponse } from 'next/server';
import { getVTUClient } from '@/lib/vtuClient';

export async function GET() {
  try {
    const client = getVTUClient();
    const balance = await client.getBalance();
    
    return NextResponse.json({
      success: true,
      data: balance,
    });
  } catch (error) {
    console.error('Balance API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch balance',
      },
      { status: 500 }
    );
  }
}
