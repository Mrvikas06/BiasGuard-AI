<div align="center">

# 🛡️ BiasGuard AI

### AI Bias Detection & Fairness Simulator

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-BiasGuard_AI-8b5cf6?style=for-the-badge)](https://mrvikas06.github.io/BiasGuard-AI/)
[![Google Gemini](https://img.shields.io/badge/Powered_by-Google_Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

**BiasGuard AI** is a real-time AI fairness auditing dashboard that detects, visualizes, and explains algorithmic bias in machine learning models. It uses **Google Gemini AI** to generate intelligent fairness reports and provides interactive **What-If simulations** for counterfactual fairness testing.

🔗 **Live Demo:** [https://mrvikas06.github.io/BiasGuard-AI/](https://mrvikas06.github.io/BiasGuard-AI/)

</div>

---

## 📸 Screenshots

<div align="center">

### Dashboard Overview
> Premium dark-mode glassmorphism dashboard with KPI cards, bias analysis charts, and active alerts

### Bias Audit Results
> Real-time bias detection with decision card, score gauge, explainability report, and Gemini AI insights

### What-If Simulator
> Counterfactual fairness testing across 6 demographic permutations

</div>

---

## ✨ Key Features

### 📊 Interactive Dashboard
- **4 KPI Cards** — Total Scans, Bias Detected, Risk Score, Models Audited with animated counters
- **Bias Analysis Chart** — Horizontal bar chart across 4 demographic vectors (Gender, Race, Age, Disability)
- **Bias Trend Sparkline** — 12-month trend visualization with gradient fill
- **Active Alerts Panel** — Real-time bias alerts with severity badges (Critical, Warning, Documented, New)
- **Donut Chart** — Bias distribution breakdown (Fair / Slight / High)
- **Audit History Table** — 6 model audits with risk badges, status indicators, and progress bars

### 🔍 Bias Audit Engine
- **Score Decomposition** — Breaks down total score into base score + location bias + gender bias
- **Decision Simulation** — Simulates AI approval/rejection with 55-point threshold
- **Bias Detection** — Generates all permutations of sensitive attributes and compares outcomes
- **Severity Classification** — Fair (≤15), Slight (16-40), High (41+)
- **Fairness Certification** — Auto-certifies models with bias score ≤ 25

### 🤖 Google Gemini AI Integration
- **AI-Powered Analysis** — Sends audit results to Gemini 2.0 Flash for intelligent analysis
- **Structured Insights** — Key Findings, Risk Assessment, Recommendations, and Fairness Grade
- **Real-time Typing Animation** — Streams AI response with markdown rendering
- **Graceful Error Handling** — Clean fallback for quota limits or connection issues

### 🔄 What-If Simulator
- **Counterfactual Testing** — Tests all combinations of Gender × Location
- **Decision Flip Detection** — Identifies when demographic changes flip the outcome
- **Point Swing Analysis** — Calculates max score variance across permutations
- **Visual Comparison Table** — Side-by-side scores with delta indicators

### 🎨 Premium UI/UX
- **Dark Glassmorphism Theme** — `backdrop-filter: blur(24px)` with translucent panels
- **Ambient Gradient Background** — Slow-drifting radial gradients
- **Glowing Data Visualization** — Luminous chart bars, gauge rings, and status dots
- **Staggered Entry Animations** — `fadeUp`, `slideRight`, `scaleIn` per element
- **Micro-interactions** — Hover lifts, border glows, alert slides

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework with hooks |
| **Vite 8** | Build tool & dev server |
| **Google Gemini AI** | AI-powered bias analysis (gemini-2.0-flash-lite) |
| **Tailwind CSS 4** | Utility classes |
| **Custom CSS** | Glassmorphism, animations, glowing effects |
| **GitHub Pages** | Cloud deployment |

---

## 🏗️ Project Structure

```
BiasGuard-AI/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # Dark glassmorphism sidebar navigation
│   │   ├── TopBar.jsx           # Search, notifications, live status
│   │   ├── KPICards.jsx         # 4 animated metric cards
│   │   ├── BiasChart.jsx        # Horizontal bar chart + sparkline trend
│   │   ├── AlertsPanel.jsx      # Alert cards + donut chart
│   │   ├── AuditTable.jsx       # Audit history data table
│   │   ├── InputForm.jsx        # Applicant profile form
│   │   ├── DecisionCard.jsx     # Decision result + score ring
│   │   ├── BiasScoreMeter.jsx   # Circular bias gauge
│   │   ├── ExplanationPanel.jsx # Bias findings with impact levels
│   │   ├── GeminiInsights.jsx   # AI analysis with typing animation
│   │   └── WhatIfSimulator.jsx  # Counterfactual simulation table
│   ├── utils/
│   │   ├── biasEngine.js        # Core bias detection logic
│   │   └── gemini.js            # Google Gemini API client
│   ├── App.jsx                  # Main dashboard controller
│   └── index.css                # Premium dark-mode design system
├── .env                         # API keys (not committed)
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9
- **Gemini API Key** from [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

### Installation

```bash
# Clone the repository
git clone https://github.com/Mrvikas06/BiasGuard-AI.git
cd BiasGuard-AI

# Install dependencies
npm install

# Create environment file
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 🔧 How It Works

### Bias Detection Algorithm

```
1. User inputs applicant profile (name, gender, location, education, experience)
2. Engine calculates base score from education + experience
3. Intentional bias factors are applied (location: +10 Urban, gender: +5 Male)
4. All permutations of sensitive attributes are generated (3 genders × 2 locations = 6)
5. Each permutation is scored and compared
6. Bias score = max(scores) - min(scores)
7. Decision flips are detected when bias changes the outcome
8. Google Gemini AI analyzes the results and generates insights
```

### Bias Scoring

| Score Range | Label | Certified |
|------------|-------|-----------|
| 0 – 15 | ✅ Fair | Yes |
| 16 – 40 | ⚠️ Slight Bias | No |
| 41 – 100 | 🔴 High Bias | No |

---

## 🎯 Use Cases

- **AI Ethics Auditing** — Evaluate ML models for demographic bias before deployment
- **Regulatory Compliance** — Demonstrate fairness testing for AI governance requirements
- **Education** — Teach students about algorithmic bias and counterfactual fairness
- **Hackathon Demos** — Showcase AI fairness tools with premium UI/UX

---

## 🔒 Security

- API keys are stored in `.env` files (not committed to git)
- No user data is persisted or sent to external servers (except Gemini API for analysis)
- All bias analysis runs client-side in the browser

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ for AI Fairness**

[Live Demo](https://mrvikas06.github.io/BiasGuard-AI/) · [Report Bug](https://github.com/Mrvikas06/BiasGuard-AI/issues) · [Request Feature](https://github.com/Mrvikas06/BiasGuard-AI/issues)

</div>
