'use client';

import React, { useState } from 'react';
import { 
  Package, 
  Bed, 
  Ambulance, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingDown, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  Send,
  Plus
} from 'lucide-react';
import { PHC_CENTERS } from '@/lib/mockData';
import { PHCCenter } from '@/types';

export default function PhcInventoryPage() {
  const [phcs, setPhcs] = useState<PHCCenter[]>(PHC_CENTERS);
  const [selectedPhc, setSelectedPhc] = useState<PHCCenter>(PHC_CENTERS[0]);
  const [restockAlert, setRestockAlert] = useState<string | null>(null);

  const handleRestock = (itemName: string) => {
    setRestockAlert(`Autonomous Central Drug Depot replenishment PO generated for ${itemName} at ${selectedPhc.name}!`);
    setTimeout(() => setRestockAlert(null), 4000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold border border-emerald-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Autonomous Stock & Bed Optimization
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
            PHC Supply, <span className="gradient-text">Bed & Emergency</span> Resource Command
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time tracking of critical life-saving drugs, oxygen cylinders, ICU beds, and 108 ALS ambulances across rural clinics.
          </p>
        </div>

        {/* PHC Selector */}
        <select
          value={selectedPhc.id}
          onChange={(e) => {
            const found = phcs.find((p) => p.id === e.target.value);
            if (found) setSelectedPhc(found);
          }}
          className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-teal-500 self-start sm:self-auto font-medium"
        >
          {phcs.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.district})
            </option>
          ))}
        </select>
      </div>

      {restockAlert && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center justify-between animate-in fade-in">
          <span>📦 {restockAlert}</span>
          <span className="text-[10px] text-emerald-400 font-mono">SUPPLY CHAIN: DISPATCHED</span>
        </div>
      )}

      {/* Facility Overview Banner */}
      <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              Constituency: {selectedPhc.constituency}
            </span>
            <h2 className="text-xl font-bold font-display text-white mt-1">{selectedPhc.name}</h2>
            <p className="text-xs text-slate-400">
              District: {selectedPhc.district}, {selectedPhc.state} • Duty Doctors: <strong>{selectedPhc.doctorsOnDuty}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block uppercase">Bed Occupancy</span>
              <span className="text-base font-bold text-teal-300">
                {selectedPhc.bedsOccupied} / {selectedPhc.bedsTotal}
              </span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block uppercase">108 Ambulances</span>
              <span className="text-base font-bold text-emerald-400">
                {selectedPhc.ambulancesAvailable} Ready
              </span>
            </div>
          </div>
        </div>

        {/* Occupancy Progress Bar */}
        <div className="space-y-1.5 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Overall Ward Bed Utilization</span>
            <span className="font-bold text-white">
              {Math.round((selectedPhc.bedsOccupied / selectedPhc.bedsTotal) * 100)}% Occupied
            </span>
          </div>
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                (selectedPhc.bedsOccupied / selectedPhc.bedsTotal) > 0.8
                  ? 'bg-rose-500'
                  : 'bg-gradient-to-r from-teal-500 to-emerald-400'
              }`}
              style={{
                width: `${(selectedPhc.bedsOccupied / selectedPhc.bedsTotal) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Critical Life-Saving Supplies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Item 1: Oxygen Cylinders */}
        <div className="glass-panel rounded-2xl border border-slate-800 p-5 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Critical Care</span>
              <h4 className="font-bold text-white text-base mt-0.5">Oxygen Cylinders (B-Type)</h4>
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Package className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-display text-cyan-300">
              {selectedPhc.oxygenCylindersAvailable}
            </span>
            <span className="text-xs text-slate-400">Cylinders Full</span>
          </div>

          <p className="text-xs text-slate-400">
            {selectedPhc.oxygenCylindersAvailable < 5 ? (
              <span className="text-rose-400 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Re-supply Threshold Met
              </span>
            ) : (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Buffer Sufficient (72 hrs)
              </span>
            )}
          </p>

          <button
            onClick={() => handleRestock('Medical Oxygen Cylinders')}
            className="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-colors"
          >
            Order +10 Cylinders
          </button>
        </div>

        {/* Item 2: Polyvalent Anti-Venom */}
        <div className="glass-panel rounded-2xl border border-slate-800 p-5 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Life-Saving</span>
              <h4 className="font-bold text-white text-base mt-0.5">Polyvalent Snake Anti-Venom</h4>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Package className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-display text-rose-300">
              {selectedPhc.antivenomVials}
            </span>
            <span className="text-xs text-slate-400">Vials in Cold Chain</span>
          </div>

          <p className="text-xs text-slate-400">
            {selectedPhc.antivenomVials < 6 ? (
              <span className="text-rose-400 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Low Stock! Snakebite Peak Season
              </span>
            ) : (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Optimal Stock
              </span>
            )}
          </p>

          <button
            onClick={() => handleRestock('Anti-Snake Venom (ASV)')}
            className="w-full py-2 rounded-lg bg-rose-500/20 hover:bg-rose-500 hover:text-white text-rose-300 border border-rose-500/40 text-xs font-bold transition-colors"
          >
            Emergency ASV Restock
          </button>
        </div>

        {/* Item 3: Paracetamol & Essential Analgesics */}
        <div className="glass-panel rounded-2xl border border-slate-800 p-5 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Essential Drug</span>
              <h4 className="font-bold text-white text-base mt-0.5">Paracetamol 650mg Tabs</h4>
            </div>
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Package className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-display text-teal-300">
              {selectedPhc.paracetamolStock.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400">Tablets</span>
          </div>

          <p className="text-xs text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Sufficient for Outpatient OPD
          </p>

          <button
            onClick={() => handleRestock('Paracetamol 650mg')}
            className="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-teal-300 border border-teal-500/30 text-xs font-bold transition-colors"
          >
            Order +5,000 Strips
          </button>
        </div>

        {/* Item 4: Emergency Ambulances */}
        <div className="glass-panel rounded-2xl border border-slate-800 p-5 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">EMS Fleet</span>
              <h4 className="font-bold text-white text-base mt-0.5">108 ALS Ambulances</h4>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Ambulance className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-display text-emerald-300">
              {selectedPhc.ambulancesAvailable}
            </span>
            <span className="text-xs text-slate-400">GPS Units Active</span>
          </div>

          <p className="text-xs text-teal-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Response Time &lt; 14 Mins
          </p>

          <button
            onClick={() => alert(`108 Emergency Standby alert broadcasted to fleet!`)}
            className="w-full py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 hover:text-slate-950 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-colors"
          >
            Broadcast Fleet Standby
          </button>
        </div>
      </div>
    </div>
  );
}
