export type SeverityLevel = 'ESI-1' | 'ESI-2' | 'ESI-3' | 'ESI-4' | 'ESI-5';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  village: string;
  contact: string;
  symptoms: string[];
  vitals: {
    bloodPressure: string;
    heartRate: number;
    spO2: number;
    temperature: number; // in Fahrenheit
    respiratoryRate: number;
  };
  severity: SeverityLevel;
  triageReason: string;
  timestamp: string;
  assignedDoctor?: string;
  status: 'Waiting' | 'In Consultation' | 'Transferred' | 'Discharged';
  recommendedActions: string[];
  qrCodeData?: string;
}

export interface PHCCenter {
  id: string;
  name: string;
  constituency: string;
  district: string;
  state: string;
  coordinates: [number, number];
  bedsTotal: number;
  bedsOccupied: number;
  oxygenCylindersAvailable: number;
  antivenomVials: number;
  paracetamolStock: number;
  doctorsOnDuty: number;
  ambulancesAvailable: number;
  activeOutbreakAlert?: string;
}

export interface DiseaseOutbreak {
  id: string;
  diseaseName: string;
  casesReported: number;
  riskLevel: 'High' | 'Moderate' | 'Low';
  trend: 'Rising' | 'Stable' | 'Declining';
  hotspotVillage: string;
  coordinates: [number, number];
  recommendedProtocol: string;
  affectedPopulationEstimate: number;
}

export interface PrescriptionAnalysisResult {
  patientName?: string;
  diagnosedCondition: string;
  confidenceScore: number;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
    vernacularExplanation: string;
  }[];
  criticalWarnings: string[];
  dietaryAdvice: string[];
  followUpDays: number;
  emergencySigns: string[];
  extractedRawText: string;
}

export interface ASHAConversationMessage {
  id: string;
  sender: 'asha' | 'ai' | 'patient';
  text: string;
  audioUrl?: string;
  timestamp: string;
  language: 'en' | 'hi' | 'te' | 'ta' | 'mr' | 'bn';
  keyInsights?: {
    symptomsIdentified: string[];
    immediateFirstAid: string;
    urgencyFlag: boolean;
  };
}
