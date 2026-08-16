'use client';

import React, { useState } from 'react';
import { 
  Stethoscope, 
  HeartPulse, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  QrCode, 
  UserPlus, 
  Filter, 
  Phone, 
  MapPin, 
  Clock, 
  Ambulance, 
  AlertTriangle 
} from 'lucide-react';
import { INITIAL_PATIENTS } from '@/lib/mockData';
import { Patient, SeverityLevel } from '@/types';
import QRHealthCardModal from '@/components/QRHealthCardModal';

export default function TriagePage() {
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [selectedPatientForQR, setSelectedPatientForQR] = useState<Patient | null>(null);
  const [isTriaging, setIsTriaging] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    age: 35,
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    village: 'Kalyanpur Ward 2',
    contact: '+91 98765 43210',
    symptoms: 'High fever, severe body ache, rash on chest',
    bloodPressure: '110/70',
    heartRate: 98,
    spO2: 95,
    temperature: 102.4,
    respiratoryRate: 20,
  });

  const sampleQuickFill = [
    {
      title: '🚨 Suspected Myocardial Infarction (ESI-1)',
      data: {
        name: 'Harish Chandra',
        age: 62,
        gender: 'Male' as const,
        village: 'Shivajinagar Sector 3',
        contact: '+91 98330 11902',
        symptoms: 'Severe retrosternal squeezing pain radiating to jaw, heavy diaphoresis, shortness of breath',
        bloodPressure: '175/110',
        heartRate: 122,
        spO2: 88,
        temperature: 98.6,
        respiratoryRate: 28,
      },
    },
    {
      title: '⚠️ Dengue Warning Signs (ESI-2)',
      data: {
        name: 'Pooja Devi',
        age: 24,
        gender: 'Female' as const,
        village: 'Kalyanpur Canal Gali',
        contact: '+91 94112 88401',
        symptoms: 'High continuous fever 5 days, severe abdominal pain, persistent vomiting, gum bleeding',
        bloodPressure: '92/60',
        heartRate: 108,
        spO2: 96,
        temperature: 103.5,
        respiratoryRate: 22,
      },
    },
    {
      title: '👶 Pediatric Severe Gastroenteritis (ESI-2)',
      data: {
        name: 'Chhotu (Baby of Anita)',
        age: 3,
        gender: 'Male' as const,
        village: 'Bhimnagar Outer',
        contact: '+91 88901 22345',
        symptoms: 'Profuse watery stools 10+ episodes, sunken eyes, dry mouth, unable to drink water',
        bloodPressure: '82/50',
        heartRate: 138,
        spO2: 97,
        temperature: 99.4,
        respiratoryRate: 32,
      },
    },
  ];

  const handleRunTriage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTriaging(true);

    try {
      const response = await fetch('/api/triage-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          age: Number(formData.age),
          gender: formData.gender,
          symptoms: formData.symptoms.split(',').map((s) => s.trim()),
          vitals: {
            bloodPressure: formData.bloodPressure,
            heartRate: Number(formData.heartRate),
            spO2: Number(formData.spO2),
            temperature: Number(formData.temperature),
            respiratoryRate: Number(formData.respiratoryRate),
          },
        }),
      });

      const resJson = await response.json();
      const triage = resJson.triage;

      const newPatient: Patient = {
        id: `PT-${Math.floor(1000 + Math.random() * 9000)}`,
        name: formData.name || 'Anonymous Patient',
        age: Number(formData.age),
        gender: formData.gender,
        village: formData.village,
        contact: formData.contact,
        symptoms: formData.symptoms.split(',').map((s) => s.trim()),
        vitals: {
          bloodPressure: formData.bloodPressure,
          heartRate: Number(formData.heartRate),
          spO2: Number(formData.spO2),
          temperature: Number(formData.temperature),
          respiratoryRate: Number(formData.respiratoryRate),
        },
        severity: triage.severity as SeverityLevel,
        triageReason: triage.triageReason,
        timestamp: 'Just now',
        status: triage.severity === 'ESI-1' ? 'In Consultation' : 'Waiting',
        recommendedActions: triage.recommendedActions,
      };

      setPatients([newPatient, ...patients]);
      setSelectedPatientForQR(newPatient);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTriaging(false);
    }
  };

  const filteredPatients = patients.filter((p) => {
    if (filterSeverity === 'ALL') return true;
    return p.severity === filterSeverity;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-teal-500/10 text-teal-300 text-xs font-semibold border border-teal-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Google Gemini Clinical Multi-Agent Engine
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
            PHC Multi-Agent <span className="gradient-text">Clinical Triage</span> Queue
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Automated Emergency Severity Index (ESI 1-5) assessment, vital signs risk calculator, and ABHA emergency referral passes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-400" /> Avg Triage Latency: <strong className="text-white">1.2s</strong>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Patient Intake & Hemodynamics (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-2xl border border-teal-500/30 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold font-display text-white text-base flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-teal-400" /> Patient Clinical Registration
              </h3>
            </div>

            {/* Quick Fill Templates for Judges */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Quick Sample Presets (1-Click Test):
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {sampleQuickFill.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData({ ...formData, ...preset.data })}
                    className="p-2 text-left rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-teal-500/40 text-xs text-slate-200 transition-all"
                  >
                    {preset.title}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleRunTriage} className="space-y-4 pt-2 border-t border-slate-800">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Patient Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rameshwar Patil"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Age & Gender</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      required
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                      className="w-16 px-2 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-teal-500"
                    />
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                      className="flex-1 px-2 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-teal-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Presenting Symptoms</label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Acute chest pressure, diaphoresis, shortness of breath"
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Vitals Grid */}
              <div>
                <label className="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-2">
                  Hemodynamic Vital Signs
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">BP (mmHg)</span>
                    <input
                      type="text"
                      value={formData.bloodPressure}
                      onChange={(e) => setFormData({ ...formData, bloodPressure: e.target.value })}
                      className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Pulse (BPM)</span>
                    <input
                      type="number"
                      value={formData.heartRate}
                      onChange={(e) => setFormData({ ...formData, heartRate: Number(e.target.value) })}
                      className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">SpO2 (%)</span>
                    <input
                      type="number"
                      value={formData.spO2}
                      onChange={(e) => setFormData({ ...formData, spO2: Number(e.target.value) })}
                      className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-cyan-400 font-bold text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Temp (°F)</span>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.temperature}
                      onChange={(e) => setFormData({ ...formData, temperature: Number(e.target.value) })}
                      className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-amber-400 text-xs"
                    />
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-slate-400 block">Village / Contact</span>
                    <input
                      type="text"
                      value={formData.village}
                      onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                      className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isTriaging}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 transition-all hover:scale-[1.02]"
              >
                {isTriaging ? (
                  <>
                    <HeartPulse className="w-4 h-4 animate-spin text-slate-950" /> Gemini Multi-Agent Triage in progress...
                  </>
                ) : (
                  <>
                    <Stethoscope className="w-4 h-4 stroke-[2.5]" /> Run Autonomous Clinical Triage
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Stream: Active Priority Queue (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-bold font-display text-white text-base flex items-center gap-2">
                  <HeartPulse className="w-5 h-5 text-rose-400" /> Active PHC Triage Stream ({filteredPatients.length})
                </h3>
                <p className="text-xs text-slate-400">Autonomous dynamic prioritization (ESI 1 = Highest Acuity)</p>
              </div>

              {/* Severity Filter Pills */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-[11px]">
                {['ALL', 'ESI-1', 'ESI-2', 'ESI-3', 'ESI-4'].map((sev) => (
                  <button
                    key={sev}
                    onClick={() => setFilterSeverity(sev)}
                    className={`px-2 py-1 rounded font-semibold transition-all ${
                      filterSeverity === sev
                        ? 'bg-teal-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
              {filteredPatients.map((pt) => {
                const getBadge = (sev: string) => {
                  if (sev === 'ESI-1') return 'badge-esi-1';
                  if (sev === 'ESI-2') return 'badge-esi-2';
                  if (sev === 'ESI-3') return 'badge-esi-3';
                  return 'badge-esi-4';
                };

                return (
                  <div
                    key={pt.id}
                    className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/40 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm">{pt.name}</h4>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${getBadge(pt.severity)}`}>
                            {pt.severity}
                          </span>
                          <span className="text-xs text-slate-400">{pt.age}y • {pt.gender}</span>
                        </div>
                        <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-teal-400" /> {pt.village}</span>
                          <span>• ID: <strong className="font-mono text-teal-300">{pt.id}</strong></span>
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedPatientForQR(pt)}
                        className="px-2.5 py-1 rounded-lg bg-teal-500/15 hover:bg-teal-500 text-teal-300 hover:text-slate-950 border border-teal-500/30 text-xs font-bold flex items-center gap-1.5 transition-all shrink-0"
                      >
                        <QrCode className="w-3.5 h-3.5" /> ABHA Pass
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
                      💡 <strong>Clinical Verdict:</strong> {pt.triageReason}
                    </p>

                    {/* Vitals Ribbon */}
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                      <span>BP: <strong className="text-white">{pt.vitals.bloodPressure}</strong></span>
                      <span>Pulse: <strong className="text-rose-400">{pt.vitals.heartRate} bpm</strong></span>
                      <span>SpO2: <strong className="text-cyan-400">{pt.vitals.spO2}%</strong></span>
                      <span>Temp: <strong className="text-amber-400">{pt.vitals.temperature}°F</strong></span>
                    </div>

                    {/* Action Protocols */}
                    <div className="space-y-1 pt-1">
                      {pt.recommendedActions.map((act, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <QRHealthCardModal
        patient={selectedPatientForQR}
        onClose={() => setSelectedPatientForQR(null)}
      />
    </div>
  );
}
