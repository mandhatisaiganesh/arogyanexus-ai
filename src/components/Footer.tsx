import React from 'react';
import { Activity, ShieldCheck, Heart, Sparkles, Github } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/80 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/60">
          {/* Col 1 */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-slate-950 font-bold">
                <Activity className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Arogya<span className="text-teal-400">Nexus</span> AI
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Built for <strong>Google Cloud & GDG Build with AI: Code for Communities</strong> hackathon. 
              Empowering grassroots Primary Health Centers (PHCs), ASHA workers, and district healthcare officers with multimodal Google Gemini intelligence.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a 
                href="https://github.com/mandhatisaiganesh" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-medium transition-colors"
              >
                <Github className="w-4 h-4" /> github.com/mandhatisaiganesh
              </a>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> ABHA / Ayushman Bharat Aligned
              </span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">AI Capabilities</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• Gemini 1.5 Multimodal Vision</li>
              <li>• Emergency Severity Index (ESI) Triage</li>
              <li>• Vernacular ASHA Voice Engine</li>
              <li>• Syndromic Outbreak Heatmapping</li>
              <li>• PHC Medicine Stock Forecaster</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Governance Alignment</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• National Health Mission (NHM)</li>
              <li>• Integrated Disease Surveillance (IDSP)</li>
              <li>• 108 Emergency Medical Response</li>
              <li>• Digital Public Infrastructure (DPI)</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-slate-500">
          <p>© 2026 ArogyaNexus AI. Open-source public health project for Indian communities.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> & Google Gemini AI
          </p>
        </div>
      </div>
    </footer>
  );
}
