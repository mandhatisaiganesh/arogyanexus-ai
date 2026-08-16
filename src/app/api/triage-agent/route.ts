import { NextRequest, NextResponse } from 'next/server';
import { runMultiAgentTriage } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const patientData = await req.json();
    const triageResult = await runMultiAgentTriage(patientData);

    return NextResponse.json({
      success: true,
      triage: triageResult,
    });
  } catch (error: any) {
    console.error('Error in triage-agent route:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Triage engine failure' },
      { status: 500 }
    );
  }
}
