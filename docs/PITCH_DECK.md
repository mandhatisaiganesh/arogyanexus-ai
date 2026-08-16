# 🎯 ArogyaNexus AI — Hackathon Pitch Deck & Slides
### **"Build with AI: Code for Communities" (Google Cloud & GDG)**

---

## Slide 1: Title & Hook
* **Title**: **ArogyaNexus AI (आरोग्य नेक्सस)**
* **Subtitle**: Autonomous Multimodal Public Healthcare & PHC Intelligence Platform
* **Track**: Smart Health Centre Management & Community Healthcare
* **Built by**: Mandhati Sai Ganesh ([github.com/mandhatisaiganesh](https://github.com/mandhatisaiganesh))
* **Tech Stack**: Google Gemini 1.5 Flash Vision, Next.js 14, Multi-Agent Triage, Web Speech Vernacular AI

---

## Slide 2: The Grassroots Healthcare Crisis in Rural India
* **The Reality**: 30,000+ Primary Health Centers (PHCs) cater to over 70% of India's population.
* **Key Pain Points**:
  1. **Doctor Shortage & Crowded OPDs**: Overwhelming patient-to-doctor ratios lead to delayed triage of life-threatening emergencies.
  2. **Unreadable Handwritten Prescriptions**: Causes medication errors and poor patient compliance among rural and illiterate populations.
  3. **Unpredictable Critical Stockouts**: Life-saving supplies like Polyvalent Snake Anti-Venom and Oxygen cylinders run out during peak seasonal surges.
  4. **Delayed Epidemic Response**: Vector-borne (Dengue, Malaria) and water-borne outbreaks are noticed only after hospital beds are overwhelmed.

---

## Slide 3: The Solution — ArogyaNexus AI
An integrated, Google Gemini-powered healthcare OS that empowers ASHA workers, PHC medical officers, and district administrators with 5 autonomous capabilities:
1. **Gemini 1.5 Flash Multimodal Vision**: Digitizes prescriptions, extracts medicine schedules, and speaks Hindi/vernacular explanations.
2. **Multi-Agent ESI-1 to ESI-5 Clinical Triage**: Triages patients in $< 1.5$ seconds using vital signs and hemodynamic patterns.
3. **ASHA Vernacular Voice Assistant**: Speech-to-Speech field copilot for door-to-door screenings in Hindi, Telugu, Tamil, and English.
4. **Geospatial Outbreak GIS Radar**: Visualizes infectious disease clusters and auto-dispatches Rapid Response Teams (RRT).
5. **ABHA QR Emergency Health Passport**: Instant verifiable digital referral pass for seamless PHC-to-District hospital transfer.

---

## Slide 4: System Architecture & Technical Innovation
* **Frontend**: Next.js 14 App Router + Tailwind CSS + Lucide Icons + Recharts
* **AI Core**:
  - **Gemini 1.5 Flash Vision**: Structured JSON schema extraction from handwritten prescriptions and lab reports.
  - **Clinical Decision Agent**: Rule-augmented LLM reasoning aligning with Emergency Severity Index (ESI) triage protocols.
  - **Vernacular Audio Synthesizer**: Web Speech API for low-bandwidth rural offline fallback.
* **Cloud & Edge Readiness**: Zero-cold-start Vercel deployment with serverless API routes.

---

## Slide 5: Real-World Public Health & Governance Impact
| Metric / Pillar | Traditional PHC Workflow | With ArogyaNexus AI |
| :--- | :--- | :--- |
| **Emergency Triage Time** | 20–45 mins waiting in queue | **$< 2$ minutes autonomous risk scoring** |
| **Prescription Adherence** | High confusion, language barrier | **Voice-assisted native language dosage** |
| **Outbreak Detection** | 7–14 days lag (post-hospitalization) | **Real-time syndromic geospatial alerts** |
| **Life-Saving Stockouts** | Reactive ordering after zero stock | **Predictive re-order threshold triggers** |

---

## Slide 6: Roadmap & Policy Alignment
* **Phase 1 (Current)**: Live Prototype deployed on Vercel with Gemini 1.5 Flash vision & triage.
* **Phase 2**: Direct integration with **Ayushman Bharat Digital Mission (ABDM)** APIs and **e-Sanjeevani Teleconsultation**.
* **Phase 3**: Edge deployment on Android tablets for offline ASHA field operation in deep rural zones.
