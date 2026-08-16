'use client';

import React, { useState } from 'react';
import { 
  Radio, 
  MapPin, 
  ShieldAlert, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  FileSpreadsheet, 
  Sparkles, 
  Building2, 
  Layers, 
  Send 
} from 'lucide-react';
import OutbreakMapVisualizer from '@/components/OutbreakMapVisualizer';
import { ACTIVE_OUTBREAKS, PHC_CENTERS } from '@/lib/mockData';
import { DiseaseOutbreak } from '@/types';

export default function OutbreakMapPage() {
  const [outbreaks, setOutbreaks] = useState<DiseaseOutbreak[]>(ACTIVE_OUTBREAKS);
  const [selectedOutbreak, setSelectedOutbreak] = useState<DiseaseOutbreak>(ACTIVE_OUTBREAKS[0]);
  const [alertSent, setAlertSent] = useState(false);

  const handleDispatchProtocol = () => {
    setAlertSent(true);
    setTimeout(() => setAlertSent(false), 4000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-500/10 text-rose-300 text-xs font-semibold border border-rose-500/30 mb-2">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> Integrated Disease Surveillance (IDSP) Mode
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
            Geospatial <span className="gradient-text">Epidemic Radar</span> & GIS Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Predictive cluster detection for vector-borne & water-borne diseases across rural primary healthcare catchments.
          </p>
        </div>

        <button
          onClick={handleDispatchProtocol}
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all self-start sm:self-auto"
        >
          <ShieldAlert className="w-4 h-4" /> Dispatch District Containment
        </button>
      </div>

      {alertSent && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center justify-between animate-in fade-in">
          <span>
            🚨 District Rapid Response Protocol dispatched to Varanasi Chief Medical Officer (CMO) & Local PHCs!
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">STATUS: ACKNOWLEDGED</span>
        </div>
      )}

      {/* Main Map Visualizer */}
      <OutbreakMapVisualizer
        outbreaks={outbreaks}
        phcs={PHC_CENTERS}
        onSelectOutbreak={(o) => setSelectedOutbreak(o)}
      />

      {/* Outbreak Deep-Dive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {outbreaks.map((ob) => (
          <div
            key={ob.id}
            className={`glass-panel rounded-2xl p-5 border transition-all ${
              selectedOutbreak.id === ob.id
                ? 'border-rose-500/60 shadow-lg shadow-rose-500/10'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                ob.riskLevel === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                {ob.riskLevel} Risk
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-rose-400" /> {ob.trend}
              </span>
            </div>

            <h4 className="font-bold font-display text-white text-base mt-3">{ob.diseaseName}</h4>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-teal-400" /> {ob.hotspotVillage}
            </p>

            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Active Cases</span>
                <span className="text-lg font-bold text-rose-400">{ob.casesReported}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Pop. at Risk</span>
                <span className="text-lg font-bold text-teal-300">{ob.affectedPopulationEstimate.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-300 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Surveillance Protocol:</span>
              <p className="leading-relaxed">{ob.recommendedProtocol}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
