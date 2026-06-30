# VC Scope OS

> **The Autonomous, AI-Powered Operating System for Modern Venture Capital Funds.** Unifying Deal Flow, CRM, Portfolio Monitoring, and Pitch Deck Intelligence into a single cohesive control center.

---

### Live Platform Access

Anyone can instantly test and check the live deployed website:

*   **Live Web App**: [https://vc-scope-os.vercel.app](https://vc-scope-os.vercel.app)
*   **API Backend**: [https://vc-scope-os.onrender.com](https://vc-scope-os.onrender.com)

**Quick-Start Test Credentials**:
*   **Email**: admin@sr.capital
*   **Password**: Password123!

---

## Core Capabilities

### 1. Sourcing & Deal Flow CRM
*   **Active Pipeline Grid**: A real-time database grid tracking every company from first pitch to IC memo approval.
*   **Outreach Terminal**: Generate highly personalized outbound emails to founders tailored by AI based on their specific sectors and thesis fit.
*   **Founder Directory**: Track serial entrepreneurs, and monitor relationship responsiveness and founder trust scores.

### 2. Evaluation & Pitch Deck Intelligence
*   **Pitch Deck Analyzer**: Drag-and-drop PDF pitch decks to automatically parse financials, founder details, and market size into the database using Google Gemini.
*   **Live Meeting Copilot**: Transcribe pitches in real time, extract key traction signals (ARR, CAC, LTV), flag operational risks, and get live question suggestions.
*   **AI Scoring Moat**: A normalized scoring matrix (0-100) assessing Team, Market, and Product moats objectively.

### 3. Investment Cap Table Modeler
*   **Simulate Funding Rounds**: Instantly calculate pre-money/post-money valuations, dilution impact, and target ownership.
*   **Automated IC Memo**: Automatically compile pitch deck data, meeting transcripts, and AI evaluations into a structured Investment Committee memo in seconds.

### 4. Risk & Portfolio Analytics
*   **Portfolio Runway Monitor**: Track cash runways, burn rates, and MRR. Automatically flags companies with less than 6 months of runway.
*   **Knowledge Graph**: Visualize relationships between startups, sectors, co-investors, and competitors in a dynamic node graph.

---

## System Architecture

The platform utilizes a modern, decoupled architecture designed for speed and security:

*   **Frontend**: Next.js 16 (App Router) + React + Custom HSL CSS Variables design system.
*   **Backend**: FastAPI (Python) + SQLAlchemy ORM.
*   **Database**: SQLite (local dev) / PostgreSQL (production).
*   **AI Integrations**: Google Gemini Pro/Flash & Groq Vision.
*   **News Crawler**: Serper API for automated startup market research.

---

## Running the Project Locally

### 1. Prerequisites
*   Python 3.10+
*   Node.js 18+

### 2. Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/nandan-s-r/vc-scope-os.git
   cd vc-scope-os
   ```
2. Set up the virtual environment:
   ```bash
   python -m venv venv
   # Windows:
   venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create your .env configuration file from the template.
5. Seed the database with mock startups:
   ```bash
   python database/seed.py
   ```
6. Run the FastAPI server:
   ```bash
   python -m uvicorn backend.api:app --host 127.0.0.1 --port 8000
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. Compile and start the development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000 in your browser.

---

## Security & Privacy
VC Scope OS has built-in security headers middleware (HSTS, CSP, XSS-Protection) and secure localStorage session tokens (vc_os_token), making it fully compliant for secure private-cloud deployment.