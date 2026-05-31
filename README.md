<div align="center">
  <h1>🚀 VC Scope OS</h1>
  <p><strong>The Autonomous, AI-Powered Operating System for Modern Venture Capital Funds</strong></p>

  <p>
    <a href="#features">Features</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a>
  </p>
</div>

---

## ⚡ Overview

**VC Scope OS** is an end-to-end deal flow and portfolio management platform built exclusively for Venture Capitalists. Traditional VCs lose hundreds of hours managing fragmented data across Excel, Airtable, Notion, and generic CRMs. 

VC Scope OS unifies **Sourcing, Intelligence, Execution, and Portfolio Risk Management** into a single, cohesive, AI-accelerated platform. Powered by a Next.js front-end and a high-performance FastAPI back-end, it acts as an autonomous analyst that works alongside you.

## ✨ Core Capabilities

### 1. 🎯 Sourcing & Deal Flow CRM
- **Startups Database:** A unified, dynamic grid for tracking every company in your pipeline.
- **Outreach Terminal:** Generate highly personalized, non-generic outbound emails to founders tailored by AI based on their sector and thesis fit.
- **Founder Tracking:** Monitor serial entrepreneurs and track relationship health (Trust Scores & Responsiveness).

### 2. 🧠 Intelligence & Evaluation
- **Live Meeting Copilot:** Transcribe live Zoom/Meet pitches via browser microphone. The AI instantly extracts *Traction Signals* (ARR, CAC), detects *Red Flags*, and suggests live follow-up questions to ask the founder.
- **Pitch Deck Analyzer:** Drag-and-drop PDF parsing that automatically extracts financials, team details, and business models into the database.
- **AI Scoring Engine:** Objective, bias-free startup evaluation generating a normalized score (0-100) based on Team, Market, and Product moats.

### 3. 💼 Execution & Investment
- **Cap Table Modeler:** Instantly simulate funding rounds, calculating post-money valuations, dilution impact, and target ownership without complex spreadsheets.
- **IC Memo Generator:** Automatically synthesize pitch deck data, live meeting notes, and AI evaluations into a structured, brutal, 3-page Investment Committee (IC) Memo in seconds.
- **Comps Engine:** Real-time industry comparable analysis to ensure fair valuations.

### 4. 📈 Risk & Portfolio Monitoring
- **Portfolio Monitor:** Track post-investment runway, burn rate, and MRR growth.
- **Risk Engine:** Automated alerting system that flags portfolio companies whose cash runway drops below critical thresholds (e.g., < 6 months).
- **Knowledge Graph:** Visual node-based mapping of your firm's relationships with co-investors, founders, and competitors.

---

## 🏗 Architecture

The platform utilizes a modern, decoupled architecture designed for speed, scalability, and AI integration.

### Frontend
- **Framework:** Next.js 14 (App Router) + React
- **Styling:** Custom CSS Design System (Tailwind-inspired but utilizing vanilla CSS variables for maximum performance and hyper-customization)
- **State Management:** React Context API + LocalStorage caching

### Backend
- **Framework:** FastAPI (Python)
- **Database:** SQLite (via SQLAlchemy ORM) with Alembic support
- **AI Integration:** Google Gemini Pro & Flash API, Groq API (for high-speed inference)
- **Web Search/Scraping:** Serper API integration for autonomous data enrichment

---

## 🚀 Installation & Setup

### Prerequisites
- Python 3.10+
- Node.js 18+ & npm
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/vc-scope-os.git
cd vc-scope-os
```

### 2. Backend Setup
```bash
# Navigate to the backend or project root
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create the .env file with your API keys
cp .env.example .env
```
*(Ensure you populate your `.env` with valid `GEMINI_API_KEY`, `GROQ_API_KEY`, and `SERPER_API_KEY`)*

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Database Seeding (Optional)
To populate the database with mock startups, founders, and metrics to test the platform:
```bash
# From the project root, with venv activated:
python database/seed.py
```

---

## 💻 Usage

We have provided a unified `start.bat` script (for Windows) to launch the environment. Alternatively, you can start the services manually:

**Start the Backend:**
```bash
# From project root
uvicorn backend.api:app --reload --host 0.0.0.0 --port 8000
```

**Start the Frontend:**
```bash
cd frontend
npm run dev
```

Navigate to `http://localhost:3000` in your browser. 
Log in using your provisioned credentials (or the default test account if seeded: `test@test.com` / `Password123!`).

---

## 🔒 Security & Privacy
VC Scope OS is designed to be deployed locally or in a private cloud. Meeting transcripts, proprietary notes, and IC Memos remain fully within your controlled infrastructure, ensuring strict confidentiality for your firm's deal flow.

---
*Built for the next generation of venture capital.*


               