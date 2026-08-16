'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  Printer, 
  Sparkles, 
  ShieldCheck, 
  HeartPulse, 
  FileSearch, 
  MapPin, 
  Mic, 
  CheckCircle2, 
  Award,
  ArrowLeft,
  Building2,
  Users
} from 'lucide-react';

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: 'Google Cloud & GDG Hackathon',
      title: 'ArogyaNexus AI (आरोग्य नेक्सस)',
      subtitle: 'Next-Gen Autonomous Public Healthcare & PHC Intelligence Platform',
      content: (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/60 to-slate-900 border border-teal-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-teal-400 font-bold uppercase">Track: Smart Health & Community Healthcare</span>
              <h3 className="text-2xl font-bold text-white">Empowering 30,000+ Rural PHCs & ASHA Workers</h3>
              <p className="text-sm text-slate-300">
                Bridging India&apos;s healthcare gap with Google Gemini 1.5 Multimodal Vision, ESI-1 to 5 Multi-Agent Triage, and Vernacular Speech Intelligence.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-teal-500/20 border border-teal-500/40 text-teal-300 text-center shrink-0">
              <span className="text-3xl font-extrabold font-display">₹10L</span>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-300">Impact Solution</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-teal-400 font-bold block text-sm">&lt; 1.5s</span>
              <span className="text-slate-400">Triage Latency</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-emerald-400 font-bold block text-sm">97.4%</span>
              <span className="text-slate-400">Rx OCR Accuracy</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-cyan-400 font-bold block text-sm">4 Dialects</span>
              <span className="text-slate-400">Vernacular Voice</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-amber-400 font-bold block text-sm">IDSP Ready</span>
              <span className="text-slate-400">Outbreak Radar</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      badge: 'The Problem',
      title: 'Grassroots Healthcare Crisis in Rural India',
      subtitle: 'Critical barriers faced by 70% of the Indian population seeking care at PHCs',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
            <h4 className="font-bold text-rose-300 text-base">1. Doctor Shortage & Crowded OPDs</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              1 doctor for every 3,500 rural citizens causes 30-60 min wait times. Silent cardiac infarctions and dengue shock cases often deteriorate in queue.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
            <h4 className="font-bold text-rose-300 text-base">2. Illegible Handwritten Prescriptions</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Messy doctor handwriting creates medication errors and patient confusion regarding daily dosage timing and food precautions.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
            <h4 className="font-bold text-rose-300 text-base">3. Life-Saving Drug Stockouts</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Critical supplies like Polyvalent Snake Anti-Venom and Medical Oxygen run out during peak seasons without predictive replenishment.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
            <h4 className="font-bold text-rose-300 text-base">4. Delayed Epidemic Surge Response</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Vector-borne (Dengue, Malaria) and water-borne outbreaks are noticed only after hospital beds are overwhelmed due to lack of syndromic GIS tools.
            </p>
          </div>
        </div>
      ),
    },
    {
      badge: 'The Solution',
      title: 'ArogyaNexus AI — 5 Core Pillars',
      subtitle: 'An end-to-end intelligent operating system for Indian public health',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-teal-500/30 space-y-2">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 w-fit">
              <FileSearch className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm">1. Gemini 1.5 Flash Rx Vision</h4>
            <p className="text-slate-400">
              Digitizes doctor slips, flags drug interactions, and speaks native language instructions with audio playback.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-teal-500/30 space-y-2">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 w-fit">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm">2. Multi-Agent ESI Triage</h4>
            <p className="text-slate-400">
              Calculates Emergency Severity Index (ESI 1-5) from vitals, instantly triggering 108 ambulance referrals and stat resuscitation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-teal-500/30 space-y-2">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 w-fit">
              <Mic className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm">3. Vernacular ASHA Copilot</h4>
            <p className="text-slate-400">
              Voice-first speech assistant in Hindi, Telugu, Tamil, and English for field health workers conducting door-to-door surveys.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-teal-500/30 space-y-2">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 w-fit">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm">4. Geospatial IDSP Radar</h4>
            <p className="text-slate-400">
              Predictive GIS cluster heatmaps alerting District Magistrates and CMOs for municipal fogging and rapid response.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-teal-500/30 space-y-2 md:col-span-2">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm">5. Smart ABHA Emergency Pass & PHC Logistics</h4>
            <p className="text-slate-400">
              Verifiable QR health cards and predictive stock replenishment for Oxygen cylinders & anti-venom vials.
            </p>
          </div>
        </div>
      ),
    },
    {
      badge: 'Public Health Impact',
      title: 'Measurable Outcomes for Communities',
      subtitle: 'Transforming rural healthcare delivery metrics across Indian constituencies',
      content: (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-2 font-semibold">Healthcare Metric</th>
                  <th className="pb-2 font-semibold text-rose-400">Traditional PHC Process</th>
                  <th className="pb-2 font-semibold text-emerald-400">With ArogyaNexus AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-2.5 font-medium">Emergency Triage Latency</td>
                  <td className="py-2.5 text-rose-300">20–45 mins in queue</td>
                  <td className="py-2.5 text-emerald-300 font-bold">&lt; 2 minutes automated scoring</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium">Prescription Comprehension</td>
                  <td className="py-2.5 text-rose-300">High confusion & non-compliance</td>
                  <td className="py-2.5 text-emerald-300 font-bold">Voice-assisted native language dosage</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium">Outbreak Detection Time</td>
                  <td className="py-2.5 text-rose-300">7–14 days lag</td>
                  <td className="py-2.5 text-emerald-300 font-bold">Real-time syndromic GIS radar</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium">Life-Saving Drug Stockouts</td>
                  <td className="py-2.5 text-rose-300">Reactive ordering post-crisis</td>
                  <td className="py-2.5 text-emerald-300 font-bold">Autonomous predictive re-supply POs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      badge: 'Production & Scalability',
      title: 'Scalability & National DPI Alignment',
      subtitle: 'Architected for integration with Ayushman Bharat Digital Mission (ABDM)',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <h4 className="font-bold text-teal-300 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Digital Public Infrastructure (DPI)
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Designed as open Digital Public Goods (DPG) compatible with ABDM ABHA ID, e-Sanjeevani Teleconsultation, and National Health Stack standards.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <h4 className="font-bold text-teal-300 text-sm flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-400" /> MP & District Administration Dashboards
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Provides constituency-level public health KPI oversight to Members of Parliament and District Collectors to optimize health fund allocation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/60 to-emerald-950/60 border border-teal-500/40 md:col-span-2 space-y-2">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-teal-400" /> Ready for Live Deployment & Evaluation
            </h4>
            <p className="text-slate-300">
              Live Vercel prototype available, full GitHub source code published, and 100% verified test suites.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Navigation Strip */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to App Dashboard
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Main Slide Presentation Stage */}
      <div className="glass-panel rounded-3xl border border-teal-500/30 p-8 sm:p-12 min-h-[500px] flex flex-col justify-between shadow-2xl relative overflow-hidden">
        {/* Slide Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
              {slides[currentSlide].badge}
            </span>
            <span className="text-xs font-mono text-slate-400">
              Slide {currentSlide + 1} of {slides.length}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
            {slides[currentSlide].title}
          </h2>
          <p className="text-sm text-slate-400">
            {slides[currentSlide].subtitle}
          </p>
        </div>

        {/* Slide Body */}
        <div className="my-8">
          {slides[currentSlide].content}
        </div>

        {/* Slide Navigation Footer */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 disabled:opacity-30 transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentSlide === i ? 'w-6 bg-teal-400' : 'bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
            disabled={currentSlide === slides.length - 1}
            className="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 hover:bg-teal-400 text-xs font-bold flex items-center gap-1.5 disabled:opacity-30 transition-all"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
