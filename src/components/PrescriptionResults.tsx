'use client';

import React, { useState } from 'react';
import { PrescriptionAnalysisResult } from '@/types';
import { 
  Pill, 
  AlertTriangle, 
  Apple, 
  Calendar, 
  Volume2, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  FileText, 
  ShieldCheck 
} from 'lucide-react';

interface PrescriptionResultsProps {
  data: PrescriptionAnalysisResult;
}

export default function PrescriptionResults({ data }: PrescriptionResultsProps) {
  const [activeTab, setActiveTab] = useState<'meds' | 'warnings' | 'diet' | 'raw'>('meds');
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const handleSpeak = (text: string, index: number) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.onend = () => setPlayingIndex(null);
      setPlayingIndex(index);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="glass-panel rounded-2xl border border-teal-500/30 p-6 space-y-6 animate-in fade-in">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-teal-400" /> Gemini 1.5 Vision Analysis
            </span>
            <span className="text-xs text-slate-400">
              Confidence: <strong className="text-emerald-400">{data.confidenceScore}%</strong>
            </span>
          </div>
          <h3 className="text-xl font-bold font-display text-white mt-1.5">
            {data.diagnosedCondition}
          </h3>
          {data.patientName && (
            <p className="text-xs text-slate-400 mt-0.5">Patient Record: {data.patientName}</p>
          )}
        </div>

        <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('meds')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'meds' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Medications ({data.medications.length})
          </button>
          <button
            onClick={() => setActiveTab('warnings')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'warnings' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Warnings ({data.criticalWarnings.length})
          </button>
          <button
            onClick={() => setActiveTab('diet')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'diet' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Diet & Home Care
          </button>
          <button
            onClick={() => setActiveTab('raw')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'raw' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            OCR Raw
          </button>
        </div>
      </div>

      {/* Tab 1: Structured Medications */}
      {activeTab === 'meds' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.medications.map((med, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/40 transition-all space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      <Pill className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{med.name}</h4>
                      <p className="text-xs text-teal-400 font-mono">{med.dosage}</p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                    {med.frequency}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" /> Duration: {med.duration}
                  </span>
                  <span>• {med.instructions}</span>
                </div>

                {/* Vernacular Explanation Box */}
                <div className="p-2.5 rounded-lg bg-teal-950/20 border border-teal-500/20 flex items-start justify-between gap-2 text-xs text-slate-300">
                  <p className="italic text-[11px] leading-relaxed">
                    🗣️ {med.vernacularExplanation}
                  </p>
                  <button
                    onClick={() => handleSpeak(med.vernacularExplanation, idx)}
                    className="p-1.5 rounded-md bg-teal-500/20 text-teal-300 hover:bg-teal-500 hover:text-slate-950 transition-colors shrink-0"
                    title="Play Audio Explanation"
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${playingIndex === idx ? 'animate-pulse text-teal-400' : ''}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-teal-400" /> Follow-Up Consultation in: <strong>{data.followUpDays} Days</strong>
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-4 h-4" /> Pharmacologically Validated by AI Engine
            </span>
          </div>
        </div>
      )}

      {/* Tab 2: Critical Warnings */}
      {activeTab === 'warnings' && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
            <h4 className="text-sm font-bold text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" /> Drug Interactions & Safety Advisories
            </h4>
            <ul className="space-y-2 text-xs text-slate-200">
              {data.criticalWarnings.map((w, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-orange-950/20 border border-orange-500/30 space-y-2">
            <h4 className="text-sm font-bold text-orange-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-400" /> Red-Flag Emergency Symptoms (Rush to PHC)
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {data.emergencySigns.map((sign, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tab 3: Diet & Home Care */}
      {activeTab === 'diet' && (
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <h4 className="text-sm font-bold text-teal-300 flex items-center gap-2">
            <Apple className="w-4 h-4 text-emerald-400" /> Nutritional & Lifestyle Guidelines
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.dietaryAdvice.map((item, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: OCR Raw Transcription */}
      {activeTab === 'raw' && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
          <div className="flex items-center gap-2 text-slate-500 pb-2 border-b border-slate-800 mb-2">
            <FileText className="w-3.5 h-3.5" /> Raw OCR Text Feed from Gemini 1.5 Flash Vision
          </div>
          {data.extractedRawText}
        </div>
      )}
    </div>
  );
}
