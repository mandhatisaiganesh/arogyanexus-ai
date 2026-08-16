import { NextRequest, NextResponse } from 'next/server';
import { analyzePrescriptionWithGemini } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, rawText } = body;

    const result = await analyzePrescriptionWithGemini(imageBase64, rawText);
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error in gemini-vision API route:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to analyze prescription' },
      { status: 500 }
    );
  }
}
