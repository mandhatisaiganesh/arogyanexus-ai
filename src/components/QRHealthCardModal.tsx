'use client';

import React from 'react';
import { Patient } from '@/types';
import { X, QrCode, Shield, HeartPulse, User, Phone, MapPin, Printer, Download, CheckCircle2 } from 'lucide-react';

interface QRHealthCardModalProps {
  patient: Patient | null;
  onClose: () => void;
}

export default function QRHealthCardModal({ patient, onClose }: QRHealthCardModalProps) {
  if (!patient) return null;

  const handlePrint = () => {
    window.print();
  };

  const getSeverityBadge = (level: string) => {
    switch (level) {
      case 'ESI-1':
        return 'bg-rose-600 text-white font-bold animate-pulse';
      case 'ESI-2':
        return 'bg-orange-500 text-white font-bold';
      case 'ESI-3':
        return 'bg-amber-500 text-slate-950 font-bold';
      case 'ESI-4':
        return 'bg-emerald-500 text-slate-950 font-bold';
      default:
        return 'bg-blue-500 text-white font-bold';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel rounded-2xl border border-teal-500/40 p-6 shadow-2xl overflow-hidden text-slate-100">
        {/* Header Ribbon */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-500 text-slate-950">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">Ayushman Digital Health Passport</h3>
              <p className="text-[11px] text-teal-400 font-mono">ABHA Ref: 91-8821-4091-{patient.id.slice(-4)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Body */}
        <div className="mt-5 space-y-4">
          {/* Patient Bio Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-bold text-white">{patient.name}</h4>
                <span className={`px-2 py-0.5 rounded text-[11px] ${getSeverityBadge(patient.severity)}`}>
                  {patient.severity}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {patient.age} Yrs • {patient.gender} • ID: <span className="font-mono text-teal-300">{patient.id}</span>
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-300 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" /> {patient.village}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-teal-400" /> {patient.contact}
                </span>
              </div>
            </div>

            {/* Simulated QR Code Graphic */}
            <div className="p-2 rounded-lg bg-white flex flex-col items-center justify-center shadow-inner">
              <div className="w-16 h-16 bg-slate-950 rounded p-1 flex items-center justify-center">
                <QrCode className="w-14 h-14 text-teal-400" />
              </div>
              <span className="text-[9px] font-mono text-slate-900 font-bold mt-1">SCAN TRIAGE</span>
            </div>
          </div>

          {/* Vitals Summary Strip */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Blood Pressure</span>
              <span className="font-bold text-teal-300">{patient.vitals.bloodPressure}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Heart Rate</span>
              <span className="font-bold text-rose-300">{patient.vitals.heartRate} bpm</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">SpO2 Oxygen</span>
              <span className="font-bold text-cyan-300">{patient.vitals.spO2}%</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Temp</span>
              <span className="font-bold text-amber-300">{patient.vitals.temperature}°F</span>
            </div>
          </div>

          {/* Clinical Triage Protocol */}
          <div className="p-3.5 rounded-xl bg-teal-950/30 border border-teal-500/30 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-teal-300 font-semibold">
              <HeartPulse className="w-4 h-4" /> Gemini Multi-Agent Triage Verdict:
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">{patient.triageReason}</p>
            <div className="pt-1.5 space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Recommended Protocols:</span>
              {patient.recommendedActions.map((act, i) => (
                <div key={i} className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Authorized by PHC Medical Officer</span>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Print Pass
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg bg-teal-500 text-slate-950 hover:bg-teal-400 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
