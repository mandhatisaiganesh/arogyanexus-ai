export interface TranslationBundle {
  appName: string;
  tagline: string;
  nav: {
    dashboard: string;
    triage: string;
    scanner: string;
    outbreakMap: string;
    ashaCopilot: string;
    inventory: string;
  };
  asha: {
    title: string;
    subtitle: string;
    tapToSpeak: string;
    listening: string;
    processing: string;
    speakPrompt: string;
    submitAssessment: string;
    keyInsights: string;
    dangerSigns: string;
    homeCareTips: string;
  };
  triage: {
    title: string;
    newPatient: string;
    patientQueue: string;
    vitalsInput: string;
    aiSeverityScore: string;
    runAIClinicalTriage: string;
    emergencyLevel: string;
  };
}

export const TRANSLATIONS: Record<string, TranslationBundle> = {
  en: {
    appName: 'ArogyaNexus AI',
    tagline: 'Autonomous Multimodal Public Health & PHC Intelligence Engine',
    nav: {
      dashboard: 'Overview',
      triage: 'AI Clinical Triage',
      scanner: 'Prescription Vision AI',
      outbreakMap: 'Epidemic Radar',
      ashaCopilot: 'ASHA Vernacular Copilot',
      inventory: 'PHC Supply & Beds',
    },
    asha: {
      title: 'ASHA Field Health Worker AI Copilot',
      subtitle: 'Voice-first vernacular assistant for door-to-door patient intake & rural triage',
      tapToSpeak: 'Tap to Speak',
      listening: 'Listening to your voice...',
      processing: 'Gemini AI is analyzing clinical symptoms...',
      speakPrompt: 'Describe patient symptoms, fever days, and vital signs in your native language.',
      submitAssessment: 'Generate Clinical Triage & Referral',
      keyInsights: 'Clinical Assessment & Urgency Flag',
      dangerSigns: 'Identified Red-Flag Danger Signs',
      homeCareTips: 'Vernacular Home Care Protocols',
    },
    triage: {
      title: 'Multi-Agent PHC Clinical Triage Queue',
      newPatient: 'Register & Triage Patient',
      patientQueue: 'Active Patient Triage Stream',
      vitalsInput: 'Patient Hemodynamic Vitals',
      aiSeverityScore: 'Emergency Severity Index (ESI)',
      runAIClinicalTriage: 'Run Gemini Multi-Agent Triage',
      emergencyLevel: 'Triage Acuity Level',
    },
  },
  hi: {
    appName: 'आरोग्य नेक्सस AI',
    tagline: 'प्राथमिक स्वास्थ्य केंद्र (PHC) एवं सामुदायिक स्वास्थ्य कृत्रिम बुद्धिमत्ता प्रणाली',
    nav: {
      dashboard: 'अवलोकन',
      triage: 'AI आपातकालीन ट्रायज',
      scanner: 'पर्चा व रिपोर्ट स्कैनर',
      outbreakMap: 'महामारी ट्रैकर नक्शा',
      ashaCopilot: 'आशा वर्कर वॉइस सहायक',
      inventory: 'दवा व बेड स्टॉक',
    },
    asha: {
      title: 'आशा वर्कर वॉइस AI साथी',
      subtitle: 'ग्रामीण इलाकों में घर-घर मरीज की जांच एवं तुरंत वॉइस सहायता',
      tapToSpeak: 'बोलने के लिए दबाएं',
      listening: 'आपकी आवाज सुनी जा रही है...',
      processing: 'जेमिनी AI लक्षणों का विश्लेषण कर रहा है...',
      speakPrompt: 'मरीज के लक्षण, बुखार के दिन और बीपी/नाड़ी की स्थिति हिंदी में बताएं।',
      submitAssessment: 'ट्रायज रिपोर्ट और डॉक्टर रेफरल तैयार करें',
      keyInsights: 'प्राथमिक स्वास्थ्य निष्कर्ष एवं गंभीरता',
      dangerSigns: 'खतरे के मुख्य लक्षण',
      homeCareTips: 'घरेलू देखभाल और प्राथमिक उपचार निर्देश',
    },
    triage: {
      title: 'मल्टी-एजेंट PHC आपातकालीन ट्रायज कतार',
      newPatient: 'नया मरीज पंजीकृत करें',
      patientQueue: 'सक्रिय मरीज कतार',
      vitalsInput: 'मरीज के मुख्य जीवन संकेत (Vitals)',
      aiSeverityScore: 'आपातकालीन गंभीरता सूचकांक (ESI)',
      runAIClinicalTriage: 'AI ट्रायज प्रारंभ करें',
      emergencyLevel: 'गंभीरता स्तर',
    },
  },
  te: {
    appName: 'ఆరోగ్య నెక్సస్ AI',
    tagline: 'ప్రాథమిక ఆరోగ్య కేంద్రాల (PHC) స్వయంప్రతిపత్తి గల కృత్రిమ మేధస్సు వేదిక',
    nav: {
      dashboard: 'ముఖ్యాంశాలు',
      triage: 'AI క్లినికల్ ట్రయాజ్',
      scanner: 'ప్రిస్క్రిప్షన్ స్కానర్',
      outbreakMap: 'వ్యాధి వ్యాప్తి మ్యాప్',
      ashaCopilot: 'ఆశా వాయిస్ అసిస్టెంట్',
      inventory: 'మందులు & బెడ్స్ వివరాలు',
    },
    asha: {
      title: 'ఆశా వర్కర్ వాయిస్ AI సహచరి',
      subtitle: 'గ్రామీణ రోగుల లక్షణాలను సులభంగా విశ్లేషించే వాయిస్ సిస్టమ్',
      tapToSpeak: 'మాట్లాడటానికి నొక్కండి',
      listening: 'మీ మాటలను వింటున్నాము...',
      processing: 'జెమిని AI విశ్లేషిస్తోంది...',
      speakPrompt: 'రోగి లక్షణాలు, జ్వరం ఎన్ని రోజులు మరియు ఇతర సమస్యలను తెలుగులో చెప్పండి.',
      submitAssessment: 'ట్రయాజ్ రిపోర్ట్ తయారు చేయండి',
      keyInsights: 'క్లినికల్ అంచనా & అత్యవసర స్థితి',
      dangerSigns: 'ప్రమాదకర సంకేతాలు',
      homeCareTips: 'గృహ సంరక్షణ మరియు ప్రథమ చికిత్స సలహాలు',
    },
    triage: {
      title: 'PHC క్లినికల్ ట్రయాజ్ క్యూ',
      newPatient: 'కొత్త రోగి నమోదు',
      patientQueue: 'రోగుల లైవ్ క్యూ',
      vitalsInput: 'రోగి వైటల్స్ వివరాలు',
      aiSeverityScore: 'ఎమర్జెన్సీ లెవల్ (ESI)',
      runAIClinicalTriage: 'AI ట్రయాజ్ రన్ చేయండి',
      emergencyLevel: 'తీవ్రత స్థాయి',
    },
  },
  ta: {
    appName: 'ஆரோக்ய நெக்ஸஸ் AI',
    tagline: 'கிராமப்புற ஆரம்ப சுகாதார நிலையங்களுக்கான AI தளம்',
    nav: {
      dashboard: 'கண்ணோட்டம்',
      triage: 'AI அவசர சிகிச்சை தரம்',
      scanner: 'மருத்துவ சீட்டு ஸ்கேனர்',
      outbreakMap: 'நோய் தொற்று வரைபடம்',
      ashaCopilot: 'ஆஷா வாய்ஸ் உதவியாளர்',
      inventory: 'மருந்து மற்றும் படுக்கை நிலை',
    },
    asha: {
      title: 'ஆஷா பணியாளர் வாய்ஸ் AI உதவியாளர்',
      subtitle: 'கிராமப்புற நோயாளிகளுக்கான குரல் வழி AI பரிசோதனை அமைப்பு',
      tapToSpeak: 'பேச கிளிக் செய்யவும்',
      listening: 'உங்கள் குரலைக் கேட்கிறது...',
      processing: 'ஜெமினி AI அறிகுறிகளை பகுப்பாய்வு செய்கிறது...',
      speakPrompt: 'நோயாளியின் அறிகுறிகள் மற்றும் காய்ச்சல் விவரங்களை தமிழில் கூறவும்.',
      submitAssessment: 'பரிந்துரை அறிக்கையை உருவாக்கவும்',
      keyInsights: 'மருத்துவ மதிப்பீடு மற்றும் அவசரம்',
      dangerSigns: 'அபாய அறிகுறிகள்',
      homeCareTips: 'வீட்டுப் பராமரிப்பு வழிமுறைகள்',
    },
    triage: {
      title: 'PHC நோயாளிகள் வரிசை',
      newPatient: 'புதிய நோயாளி பதிவு',
      patientQueue: 'நோயாளிகள் பட்டியல்',
      vitalsInput: 'உடல்நிலை அளவீடுகள்',
      aiSeverityScore: 'அவசர நிலை குறியீடு (ESI)',
      runAIClinicalTriage: 'AI பரிசோதனையை இயக்கவும்',
      emergencyLevel: 'தீவிர நிலை',
    },
  },
};
