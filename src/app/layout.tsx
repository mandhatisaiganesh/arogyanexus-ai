import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'ArogyaNexus AI | Autonomous Public Health & PHC Intelligence',
  description: 'AI Multi-Agent Clinical Triage, Multimodal Prescription Vision & Geospatial Epidemic Surveillance for Primary Health Centers in India. Powered by Google Gemini 1.5 Flash.',
  keywords: [
    'ArogyaNexus',
    'Google Gemini',
    'Code for Communities',
    'GDG Hackathon',
    'AI Triage',
    'Smart Health PHC',
    'Ayushman Bharat',
    'Healthcare AI'
  ],
  authors: [{ name: 'Mandhati Sai Ganesh', url: 'https://github.com/mandhatisaiganesh' }],
  openGraph: {
    title: 'ArogyaNexus AI - Autonomous PHC & Community Health Platform',
    description: 'Transforming rural public healthcare with Google Gemini 1.5 Multimodal Vision and Multi-Agent Clinical Triage.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#060d17] text-slate-100 antialiased selection:bg-teal-500 selection:text-slate-950">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
