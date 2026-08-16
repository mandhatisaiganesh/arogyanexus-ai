'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Activity, 
  Stethoscope, 
  FileSearch, 
  MapPin, 
  Mic, 
  Package, 
  Globe, 
  ShieldAlert, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';
import { TRANSLATIONS } from '@/lib/translations';

interface NavbarProps {
  currentLang?: string;
  onLanguageChange?: (lang: string) => void;
}

export default function Navbar({ currentLang = 'en', onLanguageChange }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState(currentLang);

  const t = TRANSLATIONS[lang]?.nav || TRANSLATIONS['en'].nav;

  const handleLangSelect = (newLang: string) => {
    setLang(newLang);
    if (onLanguageChange) onLanguageChange(newLang);
  };

  const navItems = [
    { label: t.dashboard, href: '/', icon: Activity },
    { label: t.triage, href: '/triage', icon: Stethoscope },
    { label: t.scanner, href: '/vision-scanner', icon: FileSearch },
    { label: t.outbreakMap, href: '/outbreak-map', icon: MapPin },
    { label: t.ashaCopilot, href: '/asha-copilot', icon: Mic },
    { label: t.inventory, href: '/phc-inventory', icon: Package },
    { label: 'Pitch Deck', href: '/presentation', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 via-emerald-400 to-cyan-400 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                Arogya<span className="text-teal-400">Nexus</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  <Sparkles className="w-2.5 h-2.5 mr-0.5" /> AI 1.5
                </span>
              </span>
              <span className="hidden sm:block text-[11px] text-slate-400 font-medium tracking-wide">
                Public Health & PHC Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Vernacular Language Switcher & Live Pulse */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-700/60 rounded-lg p-1 text-xs">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
              {[
                { code: 'en', label: 'ENG' },
                { code: 'hi', label: 'हिंदी' },
                { code: 'te', label: 'తెలుగు' },
                { code: 'ta', label: 'தமிழ்' },
              ].map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLangSelect(language.code)}
                  className={`px-2 py-1 rounded font-medium transition-all ${
                    lang === language.code
                      ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {language.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              4 PHCs Synced
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-teal-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-3 pb-5 space-y-2">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Select Language</span>
            <div className="flex gap-1">
              {['en', 'hi', 'te', 'ta'].map((code) => (
                <button
                  key={code}
                  onClick={() => handleLangSelect(code)}
                  className={`px-2 py-1 text-xs rounded font-medium ${
                    lang === code ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium ${
                    isActive
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-5 h-5 text-teal-400" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
