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
    if (!body.request_id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required field: request_id',
        },
        { status: 400 }
      );
    }

    const client = getVTUClient();
    const result = await client.requeryTransaction({
      request_id: body.request_id,
    });
    
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Requery API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to requery transaction',
      },
      { status: 500 }
    );
  }
}
