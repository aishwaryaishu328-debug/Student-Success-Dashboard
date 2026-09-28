# 🎓 Student Success Dashboard

A modern, responsive, and beginner-friendly academic task manager and progress tracker designed for college students.

Built with **Next.js 14 (App Router)**, **React 18**, **TypeScript**, and **Tailwind CSS**.

---

## 🌟 Features

- **📊 Comprehensive Academic Overview**:
  - Personalized student welcome banner with dynamic greetings and target GPA.
  - Current real-time date display.
  - 4 key metrics cards: **Total Tasks**, **Completed Tasks**, **Pending Tasks**, and **Progress Rate (%)**.
- **✅ Task Management**:
  - Add tasks with title, course/subject, priority level (Low, Medium, High), and due date.
  - Mark tasks as completed or pending with smooth checkbox toggles.
  - Filter tasks seamlessly by **All**, **Pending**, and **Completed**.
  - Search filter to instantly find tasks across titles and subjects.
  - Delete individual tasks.
  - Intelligent "Due Soon" alert badges for tasks approaching their deadline.
- **📈 Study Progress & Breakdown**:
  - Live progress bar showing overall completion rate.
  - Subject-by-subject distribution bar charts.
  - Dynamic motivational tips that adapt as you complete tasks.
- **💾 Local Persistence**:
  - Automatically preserves task updates to browser `localStorage`.
  - Includes a 1-click **Reset Demo Data** button to quickly restore sample tasks anytime.
- **📱 Fully Responsive Design**:
  - Modern sidebar navigation with mobile drawer support.
  - Accessible button focus rings, high contrast typography, and subtle micro-interactions.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 14** (App Router) | React Framework providing modern file-based routing and production bundling |
| **React 18** | Declarative component-based UI library using hooks (`useState`, `useEffect`) |
| **TypeScript** | Static typing for bulletproof type safety and developer ergonomics |
| **Tailwind CSS v3** | Utility-first CSS framework for custom, responsive design without stylesheet bloat |
| **Lucide React** | Clean, lightweight SVG icon system |

---

## 📂 Project Structure & Architecture

```text
Student-Success-Dashboard/
├── package.json              # Project metadata, scripts, and dependencies
├── tsconfig.json             # TypeScript compiler rules & path aliases (@/*)
├── tailwind.config.ts        # Tailwind design system configuration
├── postcss.config.js         # PostCSS plugins (Tailwind & Autoprefixer)
├── next.config.mjs           # Next.js framework settings
├── .gitignore                # Files excluded from Git version control
├── src/
│   ├── app/
│   │   ├── globals.css       # Global styles, Tailwind directives, custom scrollbars
│   │   ├── layout.tsx        # Root HTML shell, page metadata, font configuration
│   │   └── page.tsx          # Main Dashboard page: state, filters, metrics calculation
│   ├── components/
│   │   ├── Sidebar.tsx       # Desktop & mobile drawer navigation + student profile
│   │   ├── Header.tsx        # Greeting, live date, search bar, & Add Task button
│   │   ├── DashboardCard.tsx # Metric highlight cards with color-coded gradients
│   │   ├── TaskList.tsx      # Tab filters, task container, & empty states
│   │   ├── TaskItem.tsx      # Individual task card, toggle, priority pill, delete
│   │   ├── ProgressCard.tsx  # Progress bar, subject breakdown, study tips
│   │   └── AddTaskModal.tsx  # Accessible modal dialog for creating new tasks
│   ├── lib/
│   │   ├── sampleData.ts     # Initial demo tasks and subject catalog
│   │   └── utils.ts          # Utility functions (cn class-merger, date formatting)
│   └── types/
│       └── task.ts           # TypeScript interfaces (Task, Priority, StudentProfile)
└── README.md                 # Complete documentation & learning guide
```

---

## 🚀 Beginner's Quickstart Guide

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18.17 or higher recommended).
You can verify your installation by opening a terminal and running:
```bash
node -v
npm -v
```

> **Windows PowerShell Tip:**
> If Windows blocks npm scripts with `execution policy` error, run this command in your PowerShell window:
> ```powershell
> Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
> ```

---

### 2. Installation (`npm install`)
Install all required project dependencies specified in `package.json`:
```bash
npm install
```

**What happens behind the scenes?**
- `npm` reads `package.json`.
- It downloads all needed libraries (Next.js, React, Tailwind CSS, Lucide Icons) from the npm registry.
- It puts them inside the newly created `node_modules/` folder.
- It creates or updates `package-lock.json` to lock in exact versions for consistency across team members.

---

### 3. Run the Development Server (`npm run dev`)
Start your local development server with hot-reloading:
```bash
npm run dev
```

Open your browser and navigate to:
```text
http://localhost:3000
```

**What does `localhost` mean?**
- `localhost` refers to your own local computer (IP address `127.0.0.1`).
- Port `:3000` is the specific virtual channel your Next.js application is listening on.
- As you edit code in `src/app/page.tsx` or any component, the browser automatically updates instantly without losing your state (known as Fast Refresh / Hot Reloading).

---

### 4. Create a Production Build (`npm run build`)
Test and compile your project into optimized static files and server assets:
```bash
npm run build
```

**What happens during build?**
- Next.js runs the TypeScript compiler to verify that there are **zero type errors**.
- Tailwind scans all your code and generates the absolute minimum CSS required.
- JavaScript is bundled and minified for fast loading.
- Output is stored in the `.next/` directory.

---

### 5. Run the Production Build Locally (`npm start`)
After building, you can preview the exact production server locally:
```bash
npm start
```
This tests how fast the app will load in production before you deploy it to the cloud.

---

## 🔄 Complete Git & GitHub Workflow (Practice Step)

Now you can practice managing your code with version control!

### Step 1: Initialize Git
In your project directory terminal:
```bash
git init
```

### Step 2: Check Status & Stage Files
```bash
git status
git add .
```

### Step 3: Create Your First Commit
```bash
git commit -m "feat: initial student success dashboard with tasks, metrics, and progress tracking"
```

### Step 4: Connect to GitHub
1. Go to [GitHub](https://github.com) and click **New Repository**.
2. Name it `Student-Success-Dashboard` and leave it empty (do NOT add a README or .gitignore since we already have them).
3. Copy the remote URL and run:
```bash
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/Student-Success-Dashboard.git
git push -u origin main
```

---

## ☁️ Vercel Deployment Workflow (Practice Step)

Deploying a Next.js app to Vercel is free and takes under 2 minutes:

### Option A: Via the Vercel Web Dashboard (Recommended for beginners)
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** -> **"Project"**.
3. Select your `Student-Success-Dashboard` repository from the list.
4. Vercel automatically detects Next.js! Keep the default build settings:
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Click **"Deploy"**.
6. In ~60 seconds, your site will be live on a public URL (e.g., `student-success-dashboard.vercel.app`) with automatic HTTPS and global CDN caching!

### Option B: Via Vercel CLI (In Terminal)
```bash
npx vercel
```
Follow the interactive prompts to link and deploy directly from your command line.

---

## 💡 Future Roadmap (Next Steps to Explore)
- [ ] Connect a persistent database (PostgreSQL with Prisma / Supabase).
- [ ] Add student authentication (NextAuth.js / Clerk).
- [ ] Add AI study scheduling assistant using Google Gemini API.
- [ ] Implement Pomodoro focus timer with ambient study sounds.

---

Developed with ❤️ for hackathon teams and student developers.
