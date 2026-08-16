'use client';

import React, { useState } from 'react';
import { 
  Mic, 
  Volume2, 
  ShieldAlert, 
  HeartHandshake, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  AlertTriangle,
  Globe,
  Radio,
  UserCheck
} from 'lucide-react';
import VoiceRecorder from '@/components/VoiceRecorder';
import { TRANSLATIONS } from '@/lib/translations';

interface Message {
  sender: 'asha' | 'ai';
  text: string;
  symptoms?: string[];
  immediateAction?: string;
  isUrgent?: boolean;
}

export default function AshaCopilotPage() {
  const [currentLang, setCurrentLang] = useState<'hi' | 'te' | 'ta' | 'en'>('hi');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'नमस्ते आशा दीदी! मरीज के लक्षण, बुखार की अवधि या आपातकालीन समस्या के बारे में बोलकर या लिखकर बताएं। मैं तुरंत प्राथमिक उपचार और रेफरल सलाह दूंगा।',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const t = TRANSLATIONS[currentLang]?.asha || TRANSLATIONS['hi'].asha;

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = { sender: 'asha', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsProcessing(true);

    try {
      const res = await fetch('/api/vernacular-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, language: currentLang }),
      });

      const resJson = await res.json();
      if (resJson.success) {
        const aiData = resJson.data;
        const aiMsg: Message = {
          sender: 'ai',
          text: aiData.reply,
          symptoms: aiData.symptomsIdentified,
          immediateAction: aiData.immediateFirstAid,
          isUrgent: aiData.urgencyFlag,
        };
        setMessages((prev) => [...prev, aiMsg]);
        speakText(aiData.reply);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-teal-500/10 text-teal-300 text-xs font-semibold border border-teal-500/30 mb-2">
            <HeartHandshake className="w-3.5 h-3.5" /> ASHA Community Health Field Copilot
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
            ASHA <span className="gradient-text">Vernacular Voice</span> Assistant
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Voice-first clinical decision support in Indian languages for Accredited Social Health Activists (ASHAs).
          </p>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
          <Globe className="w-4 h-4 text-slate-400 ml-1 mr-1" />
          {[
            { code: 'hi', label: 'हिंदी (Hindi)' },
            { code: 'te', label: 'తెలుగు (Telugu)' },
            { code: 'ta', label: 'தமிழ் (Tamil)' },
            { code: 'en', label: 'English' },
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => setCurrentLang(lang.code as any)}
              className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-all ${
                currentLang === lang.code
                  ? 'bg-teal-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Voice Intake Widget (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-2xl border border-teal-500/30 p-6 space-y-4">
            <h3 className="font-bold font-display text-white text-base flex items-center gap-2">
              <Mic className="w-5 h-5 text-teal-400" /> Vernacular Voice Input
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tap mic to speak patient symptoms in {currentLang.toUpperCase()} dialect. Gemini extracts clinical entities automatically.
            </p>

            <VoiceRecorder
              language={currentLang}
              isProcessing={isProcessing}
              onTranscriptReady={(transcript) => handleSendMessage(transcript)}
            />
          </div>

          {/* Offline ASHA Field Protocol Cheat Sheet */}
          <div className="glass-panel rounded-2xl border border-slate-800 p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-teal-400" /> Grassroots Emergency Protocols
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="font-bold text-rose-400 block mb-0.5">High Fever & Convulsions:</span>
                Tepid sponge immediately. Do not force liquids during seizure. Call 108.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="font-bold text-amber-400 block mb-0.5">Acute Diarrhea:</span>
                1 packet WHO-ORS in 1 litre clean water + Zinc 20mg daily for 14 days.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-0.5">Antenatal Red Flags:</span>
                Severe headache, blurred vision, swelling in hands/face — immediate PHC referral.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Conversation & Clinical Advice (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl border border-slate-800 p-6 flex flex-col justify-between h-[640px]">
          {/* Chat Messages Scroll */}
          <div className="space-y-4 overflow-y-auto pr-2 flex-1">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'asha' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed space-y-2.5 shadow-sm ${
                    msg.sender === 'asha'
                      ? 'bg-teal-600 text-white rounded-br-none'
                      : 'bg-slate-900 text-slate-100 rounded-bl-none border border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 pb-1 border-b border-white/10">
                    <span className="text-[10px] font-bold tracking-wider uppercase opacity-80">
                      {msg.sender === 'asha' ? 'ASHA Health Worker' : 'ArogyaNexus AI'}
                    </span>
                    {msg.sender === 'ai' && (
                      <button
                        onClick={() => speakText(msg.text)}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-teal-400 transition-colors"
                        title="Read aloud"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  <p className="text-sm">{msg.text}</p>

                  {/* If AI has structured recommendations */}
                  {msg.immediateAction && (
                    <div className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/30 text-[11px] space-y-1">
                      <span className="text-teal-300 font-bold uppercase tracking-wider block">
                        Immediate Field Care:
                      </span>
                      <p className="text-slate-200">{msg.immediateAction}</p>
                    </div>
                  )}

                  {msg.isUrgent && (
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-400 bg-rose-950/40 border border-rose-500/30 p-2 rounded-lg">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>URGENT: Arrange immediate transport to nearest PHC / District Hospital!</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Text Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={`Type query in ${currentLang.toUpperCase()} or English...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-teal-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isProcessing}
              className="p-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
