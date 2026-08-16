import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { message, language } = await req.json();

    const client = getGeminiClient();
    if (client) {
      const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `You are ArogyaNexus ASHA Copilot, an AI medical field assistant for rural Indian health workers.
The user (ASHA worker) sent this message in language "${language}":
"${message}"

Provide a structured, highly actionable response in the same language or bilingual (vernacular + English terms).
Return JSON with:
{
  "reply": "Empathetic, clear field protocol reply",
  "symptomsIdentified": ["list of recognized symptoms"],
  "immediateFirstAid": "Step by step immediate home action or stabilization",
  "urgencyFlag": true/false (true if immediate PHC referral/108 ambulance is needed),
  "referralProtocol": "Clear next steps for the ASHA worker"
}
Ensure valid JSON output.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim().replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
      const parsed = JSON.parse(text);
      return NextResponse.json({ success: true, data: parsed });
    }

    // High quality fallback simulation for offline/demo
    await new Promise((res) => setTimeout(res, 800));
    return NextResponse.json({
      success: true,
      data: {
        reply: `लक्षणों के आधार पर मरीज को तेज बुखार और डिहाइड्रेशन का खतरा है। तुरंत ORS घोल पिलाएं और प्राथमिक स्वास्थ्य केंद्र (PHC) में डॉक्टर को दिखाएं।`,
        symptomsIdentified: ['High Grade Fever', 'Dehydration risk', 'Weakness'],
        immediateFirstAid: 'ठंडे पानी की पट्टी माथे पर रखें, ORS या नारियल पानी बार-बार दें, भारी भोजन न दें।',
        urgencyFlag: true,
        referralProtocol: 'PHC वाहन या 108 एम्बुलेंस से नजदीकी केंद्र पर भेजें।',
      },
    });
  } catch (error: any) {
    console.error('Error in vernacular-chat API:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Vernacular processing error' },
      { status: 500 }
    );
  }
}
