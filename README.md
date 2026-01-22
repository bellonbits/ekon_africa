# 🌍 Ekon Africa

**African Economic Expertise Powered by AI**

Ekon Africa is a comprehensive web application that brings expert economic analysis and education to everyone—from curious 11-year-olds to seasoned policymakers. Built with Next.js, TypeScript, and powered by Groq's Llama 4 Scout AI model.

![Ekon Africa](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🤖 **AI Chat Assistant** - Ask Ekon anything about African economics with three audience modes:
  - **Child Mode**: Simple explanations for 11-year-olds
  - **Adult Mode**: Balanced detail for general public
  - **Expert Mode**: Technical analysis for economists and policymakers

- 📊 **Economic Dashboard** - Interactive visualizations of key indicators:
  - GDP trends
  - Inflation rates
  - Unemployment data
  - Debt-to-GDP ratios
  - Coverage of 10 major African countries

- 🔮 **Scenario Analysis** (Coming Soon) - Explore "what-if" scenarios with adjustable parameters

- 📚 **Educational Resources** (Coming Soon) - Learn economic concepts at your own pace

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Groq API key ([Get one here](https://console.groq.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ekon_afrika
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Groq API key to `.env.local`:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
ekon_afrika/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── api/chat/          # AI chat API endpoint
│   │   ├── chat/              # Chat interface page
│   │   ├── dashboard/         # Economic dashboard page
│   │   ├── scenarios/         # Scenario analysis page
│   │   ├── learn/             # Educational resources page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── layout/           # Header, Footer
│   │   ├── home/             # Hero, Features, Stats
│   │   └── chat/             # Chat interface components
│   ├── lib/                  # Utility functions
│   │   ├── ai/              # AI client and prompt builder
│   │   └── utils.ts         # Helper functions
│   └── data/                # Static data files
│       ├── countries.json   # African countries data
│       └── indicators.json  # Economic indicators data
├── public/                  # Static assets
├── .env.local              # Environment variables (create this)
├── .env.example            # Environment template
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.js      # Tailwind CSS config
└── next.config.js          # Next.js config
```

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **AI**: Groq API with Llama 4 Scout model
- **Charts**: Recharts
- **Animations**: Framer Motion
- **State Management**: React hooks + Zustand
- **Markdown**: react-markdown with remark-gfm

## 🌈 Design System

Ekon Africa features an African-inspired color palette:

- **Primary**: Warm oranges (#F0710B)
- **Secondary**: Vibrant greens (#22C55E)
- **Accent**: Golden yellows (#F59E0B)
- **Earth**: Natural browns (#B89670)

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your `GROQ_API_KEY` environment variable in Vercel settings
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Environment Variables for Production

Make sure to set these in your deployment platform:

```env
GROQ_API_KEY=your_groq_api_key_here
NEXT_PUBLIC_APP_NAME=Ekon Africa
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Economic data sources: World Bank, IMF, African Development Bank
- AI powered by Groq and Meta's Llama 4 Scout
- Built with love for African economic education

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ for African economic education**
