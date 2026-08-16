'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Activity, 
  Stethoscope, 
  FileSearch, 
  MapPin, 
  Mic, 
  Package, 
  ShieldAlert, 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  HeartPulse, 
  AlertTriangle,
  QrCode,
  Radio,
  FileCheck
} from 'lucide-react';
import StatCard from '@/components/StatCard';
import OutbreakMapVisualizer from '@/components/OutbreakMapVisualizer';
import QRHealthCardModal from '@/components/QRHealthCardModal';
import { INITIAL_PATIENTS, PHC_CENTERS, ACTIVE_OUTBREAKS } from '@/lib/mockData';
import { Patient } from '@/types';

export default function HomePage() {
  const [selectedPatientForQR, setSelectedPatientForQR] = useState<Patient | null>(null);

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Banner with Glassmorphism & Status */}
      <section className="relative overflow-hidden rounded-3xl p-8 sm:p-12 glass-panel border border-teal-500/30 shadow-2xl">
        {/* Glow Gradients */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal-500/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built for Google Cloud & GDG Build with AI: Code for Communities</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
            Autonomous <span className="gradient-text">Public Healthcare</span> & PHC Intelligence
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            ArogyaNexus AI connects Primary Health Centers (PHCs), ASHA workers, and district medical officers 
            using <strong>Google Gemini 1.5 Multimodal Vision</strong>, real-time <strong>Emergency Severity Index (ESI) Triage</strong>, 
            and geospatial syndromic epidemic surveillance.
          </p>

          {/* Quick CTA Buttons */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <Link
              href="/triage"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-teal-500/25 transition-all hover:scale-105"
            >
              <Stethoscope className="w-4 h-4 stroke-[2.5]" /> Launch AI Triage
            </Link>

            <Link
              href="/vision-scanner"
              className="px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-slate-700 font-semibold text-sm flex items-center gap-2 transition-all hover:border-teal-500/40"
            >
              <FileSearch className="w-4 h-4 text-teal-400" /> Prescription Vision AI
            </Link>

            <Link
              href="/asha-copilot"
              className="px-4 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800 text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <Mic className="w-4 h-4 text-teal-400" /> ASHA Vernacular Copilot
            </Link>
          </div>
        </div>
      </section>

      {/* Real-time KPI Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active PHC Patients"
          value="142"
          subtitle="Across 4 District PHCs"
          icon={Users}
          trend={{ value: "+14% Today", isPositive: false }}
          colorScheme="teal"
        />
        <StatCard
          title="Critical ESI-1/2 Triaged"
          value="9 Cases"
          subtitle="Immediate ICU / Referral Action"
          icon={ShieldAlert}
          trend={{ value: "100% Routed", isPositive: true }}
          colorScheme="rose"
        />
        <StatCard
          title="Epidemic Outbreak Alerts"
          value="3 Active"
          subtitle="Dengue, Cholera, Malaria"
          icon={Radio}
          trend={{ value: "Containment Active", isPositive: true }}
          colorScheme="amber"
        />
        <StatCard
          title="Prescriptions Analyzed"
          value="1,280+"
          subtitle="Gemini 1.5 Flash Vision"
          icon={FileCheck}
          trend={{ value: "97.4% Accuracy", isPositive: true }}
          colorScheme="emerald"
        />
      </section>

      {/* Live AI Triage Stream & Action Queue */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Patient Priority Stream */}
        <div className="lg:col-span-2 glass-panel rounded-2xl border border-slate-800 p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-teal-400" /> Live Multi-Agent PHC Patient Stream
              </h3>
              <p className="text-xs text-slate-400">Autonomous severity scoring based on hemodynamics & symptoms</p>
            </div>
            <Link
              href="/triage"
              className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1 group"
            >
              Open Full Queue <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-3">
            {INITIAL_PATIENTS.slice(0, 4).map((pt) => {
              const getBadge = (sev: string) => {
                if (sev === 'ESI-1') return 'badge-esi-1';
                if (sev === 'ESI-2') return 'badge-esi-2';
                if (sev === 'ESI-3') return 'badge-esi-3';
                return 'badge-esi-4';
              };

              return (
                <div
                  key={pt.id}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h4 className="font-bold text-white text-sm">{pt.name}</h4>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${getBadge(pt.severity)}`}>
                        {pt.severity}
                      </span>
                      <span className="text-xs text-slate-400">({pt.age}y, {pt.gender})</span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-1">
                      🩺 <strong>Symptoms:</strong> {pt.symptoms.join(', ')}
                    </p>
                    <p className="text-[11px] text-teal-400/90 font-mono">
                      BP: {pt.vitals.bloodPressure} | SpO2: {pt.vitals.spO2}% | HR: {pt.vitals.heartRate} bpm
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedPatientForQR(pt)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <QrCode className="w-3.5 h-3.5" /> ABHA Pass
                    </button>
                    <Link
                      href="/triage"
                      className="px-3 py-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500 hover:text-slate-950 text-teal-300 text-xs font-bold transition-colors"
                    >
                      Assess
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Gemini Architecture & Governance Impact */}
        <div className="space-y-5">
          {/* Quick Vision Test Widget */}
          <div className="glass-panel rounded-2xl border border-teal-500/30 p-5 space-y-3">
            <div className="flex items-center gap-2 text-teal-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Multimodal AI Scanner</span>
            </div>
            <h4 className="text-base font-bold text-white">Instant Doctor Prescription & Lab OCR</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Upload handwritten medical prescriptions to decode medicine names, dosages, timings, and vernacular audio explanations in Hindi & Telugu.
            </p>
            <Link
              href="/vision-scanner"
              className="w-full py-2.5 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow transition-all"
            >
              <FileSearch className="w-4 h-4" /> Try Scanner Demo
            </Link>
          </div>

          {/* Governance Alignment Card */}
          <div className="glass-panel rounded-2xl border border-slate-800 p-5 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> MP & District Health Integration
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span>Automatic 108 ALS Ambulance routing for ESI-1 cardiac emergencies.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span>Real-time Anti-venom & O2 cylinder replenishment triggers for PHC stores.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span>IDSP syndromic disease cluster alerts for district magistrates.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Geospatial Outbreak GIS Component */}
      <section>
        <OutbreakMapVisualizer
          outbreaks={ACTIVE_OUTBREAKS}
          phcs={PHC_CENTERS}
        />
      </section>

      {/* ABHA QR Modal */}
      <QRHealthCardModal
        patient={selectedPatientForQR}
        onClose={() => setSelectedPatientForQR(null)}
      />
    </div>
  );
}
