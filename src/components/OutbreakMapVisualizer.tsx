'use client';

import React, { useState } from 'react';
import { DiseaseOutbreak, PHCCenter } from '@/types';
import { 
  AlertTriangle, 
  MapPin, 
  Layers, 
  ShieldAlert, 
  TrendingUp, 
  Building2, 
  Bed, 
  Ambulance,
  Radio
} from 'lucide-react';

interface OutbreakMapProps {
  outbreaks: DiseaseOutbreak[];
  phcs: PHCCenter[];
  onSelectOutbreak?: (outbreak: DiseaseOutbreak) => void;
}

export default function OutbreakMapVisualizer({
  outbreaks,
  phcs,
  onSelectOutbreak,
}: OutbreakMapProps) {
  const [selectedOutbreak, setSelectedOutbreak] = useState<DiseaseOutbreak>(outbreaks[0]);
  const [activeTab, setActiveTab] = useState<'all' | 'high' | 'phc'>('all');

  const filteredOutbreaks = outbreaks.filter((o) => {
    if (activeTab === 'high') return o.riskLevel === 'High';
    return true;
  });

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 p-5 overflow-hidden">
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-rose-500 animate-pulse" />
            Epidemic Surveillance & PHC GIS Radar
          </h3>
          <p className="text-xs text-slate-400">
            Real-time geospatial clustering of vector-borne & water-borne syndromic alerts
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-700/60 text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              activeTab === 'all' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Clusters ({outbreaks.length})
          </button>
          <button
            onClick={() => setActiveTab('high')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              activeTab === 'high' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            High Risk ({outbreaks.filter((o) => o.riskLevel === 'High').length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        {/* Interactive GIS Visualizer Canvas (Custom High-Tech Dark Map Layout) */}
        <div className="lg:col-span-2 relative h-[380px] rounded-xl bg-slate-950/90 border border-slate-800 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
          {/* Background Grid & Radar Simulation */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>
          
          {/* Radar Sweep Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-teal-500/20 pointer-events-none">
            <div className="w-full h-full rounded-full border border-teal-500/10 scale-75"></div>
            <div className="w-full h-full rounded-full border border-teal-500/5 scale-50"></div>
          </div>

          {/* District Boundary Overlay */}
          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-800 w-fit">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-teal-400" /> Region: <strong>Varanasi & Chandauli Cluster</strong>
            </span>
          </div>

          {/* Interactive GIS Pins for Outbreaks */}
          <div className="relative z-10 w-full h-full flex items-center justify-around px-6">
            {/* Hotspot 1: Kalyanpur (Dengue) */}
            <button
              onClick={() => {
                setSelectedOutbreak(outbreaks[0]);
                if (onSelectOutbreak) onSelectOutbreak(outbreaks[0]);
              }}
              className={`group absolute top-[28%] left-[24%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-transform hover:scale-110 ${
                selectedOutbreak.id === 'OB-101' ? 'scale-110 z-30' : 'z-20'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-rose-500 opacity-60"></span>
                <div className="w-8 h-8 rounded-full bg-rose-600 border-2 border-white flex items-center justify-center text-white shadow-lg shadow-rose-600/50">
                  <ShieldAlert className="w-4 h-4" />
                </div>
              </div>
              <span className="mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950/90 text-rose-300 border border-rose-500/50 backdrop-blur whitespace-nowrap shadow">
                Kalyanpur • 47 Dengue Cases
              </span>
            </button>

            {/* Hotspot 2: Bhimnagar (Diarrheal) */}
            <button
              onClick={() => {
                setSelectedOutbreak(outbreaks[1]);
                if (onSelectOutbreak) onSelectOutbreak(outbreaks[1]);
              }}
              className={`group absolute top-[62%] left-[68%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-transform hover:scale-110 ${
                selectedOutbreak.id === 'OB-102' ? 'scale-110 z-30' : 'z-20'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-9 w-9 rounded-full bg-orange-500 opacity-50"></span>
                <div className="w-7 h-7 rounded-full bg-orange-600 border-2 border-white flex items-center justify-center text-white shadow-lg shadow-orange-600/50">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
              </div>
              <span className="mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-orange-950/90 text-orange-300 border border-orange-500/50 backdrop-blur whitespace-nowrap shadow">
                Bhimnagar • 29 Cholera/ADD
              </span>
            </button>

            {/* Hotspot 3: Sonbhadra (Malaria) */}
            <button
              onClick={() => {
                setSelectedOutbreak(outbreaks[2]);
                if (onSelectOutbreak) onSelectOutbreak(outbreaks[2]);
              }}
              className={`group absolute top-[75%] left-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-transform hover:scale-110 ${
                selectedOutbreak.id === 'OB-103' ? 'scale-110 z-30' : 'z-20'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-slate-950 shadow-md">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-900/90 text-amber-300 border border-amber-500/40 backdrop-blur whitespace-nowrap">
                Sonbhadra • 18 Malaria
              </span>
            </button>

            {/* PHC Facility Pins */}
            {phcs.map((phc, idx) => (
              <div
                key={phc.id}
                className="absolute flex items-center gap-1 opacity-75 hover:opacity-100 transition-opacity"
                style={{
                  top: `${35 + idx * 15}%`,
                  left: `${45 + (idx % 2 === 0 ? 15 : -15)}%`,
                }}
              >
                <div className="p-1 rounded-md bg-teal-500/20 border border-teal-500/40 text-teal-300">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-[9px] font-mono text-slate-300 bg-slate-900/80 px-1 py-0.5 rounded">
                  {phc.name.split(' ')[0]} PHC
                </span>
              </div>
            ))}
          </div>

          {/* Map Footer Legend */}
          <div className="relative z-10 flex flex-wrap items-center gap-3 text-[11px] bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-800 w-fit">
            <span className="flex items-center gap-1 text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span> High Surge
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span> Moderate
            </span>
            <span className="flex items-center gap-1 text-teal-400">
              <span className="w-2 h-2 rounded-full bg-teal-400 inline-block"></span> Model PHC Center
            </span>
          </div>
        </div>

        {/* Outbreak Intelligence Sidebar */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase">
                {selectedOutbreak.riskLevel} Risk Cluster
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-rose-400" /> Trend: <strong>{selectedOutbreak.trend}</strong>
              </span>
            </div>

            <h4 className="text-base font-bold text-white mt-2">{selectedOutbreak.diseaseName}</h4>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-teal-400" /> Epicenter: {selectedOutbreak.hotspotVillage}
            </p>

            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800 text-xs">
              <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">Reported Cases</span>
                <span className="text-base font-bold text-rose-400">{selectedOutbreak.casesReported}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">Pop. at Risk</span>
                <span className="text-base font-bold text-teal-300">
                  {selectedOutbreak.affectedPopulationEstimate.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-3 p-3 rounded-lg bg-teal-950/20 border border-teal-500/30 text-xs space-y-1">
              <span className="text-[10px] text-teal-300 font-bold uppercase tracking-wider block">
                Recommended Containment Protocol:
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {selectedOutbreak.recommendedProtocol}
              </p>
            </div>
          </div>

          {/* Quick Action Button */}
          <button
            onClick={() => alert(`Municipal & PHC Containment Alert Dispatched for ${selectedOutbreak.hotspotVillage}!`)}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all"
          >
            <ShieldAlert className="w-4 h-4" /> Dispatch Rapid Response Team (RRT)
          </button>
        </div>
      </div>
    </div>
  );
}
