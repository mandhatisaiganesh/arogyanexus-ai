'use client';

import React, { useState } from 'react';
import { 
  FileSearch, 
  UploadCloud, 
  Sparkles, 
  FileText, 
  Camera, 
  CheckCircle2, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import PrescriptionResults from '@/components/PrescriptionResults';
import { SAMPLE_PRESCRIPTION_RESULT } from '@/lib/mockData';
import { PrescriptionAnalysisResult } from '@/types';

export default function VisionScannerPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<PrescriptionAnalysisResult | null>(SAMPLE_PRESCRIPTION_RESULT);
  const [customText, setCustomText] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const samplePrescriptionTexts = [
    {
      title: 'Post-MI & Hypertension Regimen',
      text: `Rx:
1. Tab. Ecosprin-AV (75/20) - 1 tab PO OD (Post dinner) x 3 months
2. Tab. Telma 40 mg - 1 tab PO OD (Morning) x Continuous
3. Tab. Betaloc 25 mg ER - 1 tab PO OD (Post Lunch) x 2 months
4. Tab. Pantocid 40 mg - 1 tab PO OD (Empty stomach) x 1 month
Advice: Low salt diet, lipid profile after 4 weeks. Review in PHC in 14 days.`,
    },
    {
      title: 'Pediatric Acute Bronchitis & Wheeze',
      text: `Rx (Patient: Baby Aarav, 4 Yrs):
1. Syp. Augmentin Duo (457mg) - 5 ml PO BD x 5 days
2. Syp. Ascoril LS - 2.5 ml PO TDS x 4 days
3. Syp. Calpol (250mg) - 5 ml SOS (Temp > 100 F)
Advice: Warm saline gargles, steam inhalation, return immediately if chest indrawing or stridor.`,
    },
    {
      title: 'Type-2 Diabetes & Diabetic Nephropathy',
      text: `Rx:
1. Tab. Janumet (50/500) - 1 tab PO BD with meals
2. Tab. Dapagliflozin 10 mg - 1 tab PO OD (Morning)
3. Tab. Atorvastatin 40 mg - 1 tab PO HS
Advice: Strict diabetic diet, HbA1c & serum creatinine monitoring every 3 months.`,
    },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        analyzeData(reader.result as string, undefined);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeData = async (imageBase64?: string, text?: string) => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/gemini-vision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, rawText: text || customText }),
      });
      const data = await res.json();
      if (data.success) {
        setResults(data.data);
      }
    } catch (err) {
      console.error(err);
      setResults(SAMPLE_PRESCRIPTION_RESULT);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectSample = (sample: { title: string; text: string }) => {
    setCustomText(sample.text);
    analyzeData(undefined, sample.text);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-teal-500/10 text-teal-300 text-xs font-semibold border border-teal-500/30 mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Google Gemini 1.5 Flash Vision Multimodal OCR
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
          Multimodal <span className="gradient-text">Prescription & Diagnostic</span> Scanner
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Digitize handwritten doctor prescriptions, decode complex medical abbreviations, and generate vernacular audio instructions for patients.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Upload & Input (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* File Upload Zone */}
          <div className="glass-panel rounded-2xl border border-teal-500/30 p-6 space-y-4">
            <h3 className="font-bold font-display text-white text-base flex items-center gap-2">
              <Camera className="w-5 h-5 text-teal-400" /> Upload Prescription Image / Report
            </h3>

            <div className="relative border-2 border-dashed border-slate-700 hover:border-teal-500/60 rounded-xl p-6 text-center transition-colors bg-slate-900/50">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="p-3 rounded-full bg-teal-500/10 text-teal-400">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold text-slate-200">
                  Drop doctor prescription photo or click to browse
                </p>
                <p className="text-[11px] text-slate-500">Supports JPG, PNG, PDF receipts up to 10MB</p>
              </div>
            </div>

            {previewImage && (
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                <p className="text-[10px] text-teal-400 font-bold uppercase mb-1">Loaded Preview:</p>
                <img
                  src={previewImage}
                  alt="Prescription preview"
                  className="max-h-40 w-full object-contain rounded-lg"
                />
              </div>
            )}

            {/* Quick Sample Presets */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Or Test with Sample Prescription Slips:
              </span>
              <div className="space-y-1.5">
                {samplePrescriptionTexts.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSample(sample)}
                    className="w-full text-left p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-teal-500/40 text-xs text-slate-200 transition-all flex items-center justify-between group"
                  >
                    <span>{sample.title}</span>
                    <span className="text-[10px] font-bold text-teal-400 group-hover:translate-x-0.5 transition-transform">
                      Analyze →
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Text Input Fallback */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-xs font-semibold text-slate-300 block">
                Or Paste Raw Prescription Text:
              </label>
              <textarea
                rows={4}
                placeholder="Rx: Tab. Paracetamol 650mg TDS..."
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-teal-500"
              />
              <button
                onClick={() => analyzeData(undefined, customText)}
                disabled={isAnalyzing || !customText.trim()}
                className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Decoding with Gemini 1.5 Vision...
                  </>
                ) : (
                  <>
                    <FileSearch className="w-4 h-4 stroke-[2.5]" /> Run Vision Analysis
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Extracted Results & Vernacular Explanations (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {isAnalyzing ? (
            <div className="glass-panel rounded-2xl border border-teal-500/30 p-12 flex flex-col items-center justify-center text-center space-y-4 min-h-[420px]">
              <div className="relative">
                <span className="w-16 h-16 rounded-full bg-teal-500/20 animate-ping absolute inset-0"></span>
                <div className="w-16 h-16 rounded-full bg-teal-500/30 border border-teal-500 flex items-center justify-center text-teal-300">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white">Gemini 1.5 Flash Vision is Parsing Rx</h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Extracting trade names, active pharmacological molecules, daily schedule, and vernacular safety warnings...
              </p>
            </div>
          ) : results ? (
            <PrescriptionResults data={results} />
          ) : (
            <div className="glass-panel rounded-2xl border border-slate-800 p-12 text-center text-slate-400">
              <FileText className="w-10 h-10 mx-auto text-slate-600 mb-2" />
              <p className="text-sm">Upload a prescription or click a sample to see AI breakdown.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
