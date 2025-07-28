This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
# Deep Search AI

## 1. Project Overview

**Apunt AI** is a Next.js application that leverages advanced AI models to automate online research and generate concise, high-quality summaries and reports. The platform is designed to help users quickly gather, analyze, and synthesize information from the web.

**Purpose:**
- Automate the process of researching topics and summarizing findings using AI.

**Main Features:**
- AI-powered search and content extraction
- Automated summarization and report generation
- User-friendly dashboard and workflow
- PDF export and file upload support
- Authentication and user management

**Target Users / Use Case:**
- Researchers, students, professionals, and teams who need to gather and summarize information efficiently.
- Ideal for academic research, market analysis, content creation, and more.

---

## 2. Folder Structure

```
apunt-ai/
├── components.json
├── constants.ts
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
│   └── ...assets
├── src/
│   ├── app/
│   │   ├── (auth)/           # Authentication pages and logic
│   │   ├── (landing)/        # Landing page
│   │   ├── (panel)/          # User dashboard/panel
│   │   ├── (research)/       # Research workflow
│   │   ├── actions/          # Server actions (delete, upload, etc.)
│   │   ├── api/              # API routes (deep-research, pdf, stripe, etc.)
│   │   └── components/       # App-level components
│   ├── components/
│   │   └── ui/               # Reusable UI components
│   ├── generated/
│   │   └── prisma/           # Prisma client
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility libraries (API, DB, etc.)
│   ├── store/                # Zustand stores
│   └── utils/                # Utility functions
├── test.ts
├── tsconfig.json
└── README.md
```

**Main Folders Explained:**
- `src/app/`: Main application logic, routes, and server actions
- `src/components/ui/`: Shared UI components (buttons, forms, dialogs, etc.)
- `src/hooks/`: Custom React hooks for state and logic
- `src/lib/`: API, database, and utility modules
- `prisma/`: Database schema and migrations
- `public/`: Static assets (images, SVGs, etc.)

---

## 3. Tech Stack

- **Framework:** Next.js 15, React 19, TypeScript
- **Database:** Prisma ORM (supports PostgreSQL, MySQL, etc.)
- **Styling:** Tailwind CSS, Radix UI
- **State Management:** Zustand
- **Authentication:** Clerk
- **Payments:** Stripe
- **File Uploads:** UploadThing
- **AI/LLM Integrations:**
  - OpenAI (via @ai-sdk/openai)
  - LangChain
  - OpenRouter
- **PDF Generation:** @react-pdf/renderer, html-pdf-chrome, md-to-pdf
- **Other:** Axios, Framer Motion, Remark, Zod, etc.

---

## 4. Architecture

- **Modular Structure:** Organized by feature (auth, landing, panel, research, etc.)
- **API Routes:** Located in `src/app/api/` for serverless functions (research, PDF, uploads, etc.)
- **Database:** Managed by Prisma, schema and migrations in `/prisma`
- **UI Components:** Reusable and accessible components in `src/components/ui/`
- **State Management:** Zustand for global state, React hooks for local state
- **Authentication:** Clerk for secure user management
- **File Uploads:** UploadThing for document handling
- **AI/LLM:** Integrations for search, extraction, and summarization

**Data Flow:**
1. User initiates a research request via the UI
2. The app generates search queries using AI
3. External search APIs fetch relevant content
4. AI models extract and summarize content
5. Results are analyzed, gaps identified, and further queries generated if needed
6. Final summary/report is generated and presented to the user

---

## 5. Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Database (e.g., PostgreSQL)

### 1. Clone the repository
```sh
git clone <repo-url>
cd deep-search-ai
```

### 2. Install dependencies
```sh
npm install
# or
yarn install
```

### 3. Configure environment variables
- Copy `.env.example` to `.env` and fill in required values (DB connection, API keys, etc.)

### 4. Set up the database
```sh
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Run the development server
```sh
npm run dev
# or
yarn dev
```
App will be available at [http://localhost:3000](http://localhost:3000)

### 6. Build for production
```sh
npm run build
npm start
```

---

## 6. Usage

- Register or log in to access the dashboard
- Enter a research topic and (optionally) clarifications
- Start the research process
- View, download, or export the generated summary/report

**Scripts:**
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Run linter

---

## 7. Contribution Guidelines

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch and open a Pull Request

---

## 8. Deployment Notes

- The app can be deployed to Vercel, Netlify, or any Node.js-compatible host
- Ensure all environment variables are set in your deployment platform
- For Docker, create a Dockerfile based on Node.js and run the usual build/start commands

---

## 9. License

This project is licensed under the MIT License.
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.