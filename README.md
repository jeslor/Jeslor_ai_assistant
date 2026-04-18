# 🤖 Jeslor Interview AI

An AI-powered mock interview platform built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, **Google Gemini**, **Vapi Voice AI**, and **Prisma** (MongoDB). Generate, conduct, and receive AI-graded feedback on job interviews — entirely through voice.

## ✨ Features

- 🎙️ **Real-time voice interviews** — powered by Vapi (Deepgram transcription + ElevenLabs voice + GPT-4)
- 🤖 **AI interview generation** — describe a role via voice or paste a job description; Gemini creates tailored questions
- 📊 **Detailed AI feedback** — scored across 13 skill categories with strengths, weaknesses, and a final assessment
- 🔐 **Authentication** — Credentials (email/password), Google OAuth, and GitHub OAuth via NextAuth v5
- 📧 **Password reset** — email-based forgot/reset password flow via SMTP (Nodemailer)
- 🏢 **Company logos** — auto-fetched via LogoKit on interview cards
- ♾️ **Infinite scroll** — paginated interview listings (your interviews + community interviews)
- 🎨 **Polished UI** — Framer Motion animations, Radix UI primitives, glassmorphism, animated backgrounds
- 🌐 **Deployable to Vercel** — zero-config deployment

## 🛠️ Tech Stack

| Layer      | Technology                                                                                                                          |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Framework  | [Next.js 15](https://nextjs.org/) (App Router, Turbopack)                                                                           |
| Language   | [TypeScript](https://www.typescriptlang.org/)                                                                                       |
| Database   | [MongoDB](https://www.mongodb.com/) via [Prisma ORM](https://www.prisma.io/) + Prisma Accelerate                                    |
| Auth       | [NextAuth v5](https://authjs.dev/) (Credentials, Google, GitHub)                                                                    |
| AI (text)  | [Google Gemini 2.5 Flash](https://ai.google.dev/) via [Vercel AI SDK](https://vercel.com/docs/ai)                                   |
| AI (voice) | [Vapi](https://vapi.ai/) (Deepgram + ElevenLabs + GPT-4)                                                                            |
| State      | [Zustand](https://zustand-demo.pmnd.rs/)                                                                                            |
| Forms      | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)                                                           |
| Styling    | [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [Radix UI](https://www.radix-ui.com/) |
| Email      | [Nodemailer](https://nodemailer.com/) (SMTP)                                                                                        |
| Icons      | [Iconify](https://iconify.design/)                                                                                                  |
| Animations | [DotLottie](https://lottiefiles.com/)                                                                                               |

## 📁 Project Structure

```
├── app/
│   ├── (auth)/                    # Auth pages (sign in, sign up, forgot/reset password)
│   ├── (root)/                    # Protected pages (dashboard, interviews, feedbacks)
│   └── api/
│       ├── auth/                  # NextAuth routes, register, forgot/reset password
│       └── vapi/generate/         # API-based interview generation
├── components/
│   ├── Agent/                     # Voice AI call interface
│   ├── interviews/                # Interview listing & cards
│   ├── Manual/                    # Help/FAQ accordion
│   ├── modal/                     # Generic modal system
│   ├── navbar/                    # Navigation bar
│   ├── postionInput/              # Job description paste input
│   ├── provider/                  # Zustand stores (user, interview, modal)
│   ├── skeletons/                 # Loading skeletons
│   └── ui/                        # Reusable UI primitives (button, form, input, etc.)
├── constants/                     # Vapi assistant configurations
├── lib/
│   ├── actions/                   # Server actions (interview, feedback, user)
│   ├── generated/prisma/          # Generated Prisma client
│   ├── helpers/                   # Email, hashing, JSON parsing, URL utils
│   ├── prisma/                    # Prisma client singleton
│   └── validators/                # Zod schemas (account, interview, feedback)
├── prisma/schema.prisma           # Database schema
└── auth.ts                        # NextAuth v5 configuration
```

## 🔄 How It Works

### Interview Generation (two paths)

1. **Voice-based** — Talk to the AI assistant on the home page. Describe the role, type, level, company, skills, and question count. The Vapi agent collects information, then Gemini parses the transcript to generate a tailored interview.
2. **Paste job description** — Paste a job listing, fill in a short form (company, question count, interview type, level), and Gemini extracts relevant details and generates questions.

### Conducting an Interview

Navigate to an interview and click the call button. A real-time voice call starts with a Vapi-powered AI interviewer that asks the generated questions, follows up, and interacts naturally.

### AI Feedback

When the call ends, the full transcript is sent to Gemini, which grades the response across **13 skill categories**:

> Communication, Technical Knowledge, Problem-Solving, Cultural Fit, Confidence, Leadership, Adaptability, Collaboration, Emotional Intelligence, Initiative, Creativity, Resilience, Attention to Detail

Each category receives a score and comment. You also get an overall score (out of 100), a list of strengths and areas for improvement, and a final assessment.

### Database Models

| Model                | Description                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| `User`               | Email/password or OAuth user. Has interviews, feedbacks, and reset tokens.                      |
| `Interview`          | Role, level, type, company, tech stack, questions. Linked to a user.                            |
| `Feedback`           | Total score, 13 category scores (embedded), strengths, areas for improvement, final assessment. |
| `PasswordResetToken` | Token-based email password reset with 1-hour expiry.                                            |

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/ai_chat_bot.git
cd ai_chat_bot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file at the root of the project:

```env
# ── App ───────────────────────────────────────────────────────────────────────
APP_NAME="Jeslor Interview AI"

# ── Database ──────────────────────────────────────────────────────────────────
DATABASE_URL=your_mongodb_connection_string

# ── NextAuth ──────────────────────────────────────────────────────────────────
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
AUTH_TRUST_HOST=true

# ── Google OAuth ──────────────────────────────────────────────────────────────
AUTH_WEBAPP_GOOGLE_CLIENT_ID=your_google_client_id
AUTH_WEBAPP_GOOGLE_CLIENT_SECRET=your_google_client_secret

# ── GitHub OAuth ──────────────────────────────────────────────────────────────
AUTH_GITHUB_ID=your_github_oauth_app_id
AUTH_GITHUB_SECRET=your_github_oauth_app_secret

# ── Google Gemini AI ──────────────────────────────────────────────────────────
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key

# ── Vapi (client-side) ────────────────────────────────────────────────────────
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_vapi_workflow_id

# ── LogoKit (client-side) ─────────────────────────────────────────────────────
NEXT_PUBLIC_LOGO_TOKEN=your_logokit_token

# ── SMTP (password reset emails) ─────────────────────────────────────────────
EMAIL_HOST=your_smtp_host
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### 4. Generate Prisma client

```bash
npx prisma generate
```

### 5. Push database schema

```bash
npx prisma db push
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables Guide

### `DATABASE_URL` — MongoDB Connection String

This project uses **MongoDB** via **Prisma**.

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and create a free account.
2. Create a new **Cluster** (the free M0 tier is sufficient).
3. Under **Database Access**, create a new database user with a username and password.
4. Under **Network Access**, add `0.0.0.0/0` to allow connections from anywhere (or restrict to your IP).
5. Click **Connect** on your cluster → **Drivers** → copy the connection string.
6. Replace `<password>` with your database user's password and append your database name:

```
DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/your_db_name?retryWrites=true&w=majority"
```

---

### `NEXTAUTH_URL` & `NEXTAUTH_SECRET` — NextAuth.js

- **`NEXTAUTH_URL`**: The canonical URL of your app. Use `http://localhost:3000` for local development and your production domain when deployed.
- **`NEXTAUTH_SECRET`**: A random secret used to sign and encrypt JWTs. Generate one with:

```bash
openssl rand -base64 32
```

---

### `AUTH_WEBAPP_GOOGLE_CLIENT_ID` & `AUTH_WEBAPP_GOOGLE_CLIENT_SECRET` — Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or select an existing one).
3. Navigate to **APIs & Services** → **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**.
4. Set the application type to **Web application**.
5. Under **Authorized redirect URIs**, add:
   - `http://localhost:3000/api/auth/callback/google` (local)
   - `https://your-domain.com/api/auth/callback/google` (production)
6. Copy the **Client ID** and **Client Secret**.

---

### `AUTH_GITHUB_ID` & `AUTH_GITHUB_SECRET` — GitHub OAuth

1. Go to [https://github.com/settings/developers](https://github.com/settings/developers).
2. Click **New OAuth App**.
3. Fill in the details:
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click **Register application**.
5. Copy the **Client ID** and generate a **Client Secret**.

---

### `GOOGLE_GENERATIVE_AI_API_KEY` — Google Gemini AI

Used by the `@ai-sdk/google` package to generate interview questions and grade feedback via the Gemini model.

1. Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey).
2. Click **Create API key**.
3. Copy the key and paste it as `GOOGLE_GENERATIVE_AI_API_KEY`.

---

### `NEXT_PUBLIC_VAPI_WEB_TOKEN` & `NEXT_PUBLIC_VAPI_WORKFLOW_ID` — Vapi Voice AI

1. Go to [https://dashboard.vapi.ai](https://dashboard.vapi.ai) and sign up.
2. From the dashboard, navigate to **API Keys** or **Settings**.
3. Copy your **Web Token** (the public/client-side token, not the private API key).
4. Create a workflow for interview generation and copy the **Workflow ID**.

> **Note:** The `NEXT_PUBLIC_` prefix exposes these values to the browser. Never use your private Vapi API key here.

---

### `NEXT_PUBLIC_LOGO_TOKEN` — LogoKit

Used to display company logos on interview cards.

1. Go to [https://logokit.com](https://logokit.com) and click **Sign Up**.
2. Once logged in, navigate to your **Dashboard** → **API Keys** (or **Settings**).
3. Copy your **API Token**.

> **Note:** The `NEXT_PUBLIC_` prefix is required so the token is accessible in client-side components.

---

### SMTP Variables — Password Reset Emails

The forgot/reset password flow sends emails via SMTP using Nodemailer.

| Variable       | Description                                                                    |
| -------------- | ------------------------------------------------------------------------------ |
| `EMAIL_HOST`   | Your SMTP server hostname (e.g. `smtp.gmail.com`, `server334.web-hosting.com`) |
| `EMAIL_PORT`   | SMTP port — `465` for SSL, `587` for TLS                                       |
| `EMAIL_SECURE` | Set to `true` for port 465                                                     |
| `EMAIL_USER`   | The sender email address                                                       |
| `EMAIL_PASS`   | The email account password (use an App Password for Gmail)                     |

> **Gmail users:** Enable 2-Step Verification and generate an [App Password](https://myaccount.google.com/apppasswords).

---

## 🚢 Deployment

### Vercel

1. Push your repo to GitHub.
2. Import the project on [Vercel](https://vercel.com/new).
3. Add all environment variables from your `.env` file in the Vercel dashboard.
4. Set `NEXTAUTH_URL` to your production domain.
5. Deploy.

Prisma client generation runs automatically during `next build`.

---

## 📜 Scripts

| Script          | Command                   | Description                   |
| --------------- | ------------------------- | ----------------------------- |
| Dev server      | `npm run dev`             | Starts Next.js with Turbopack |
| Build           | `npm run build`           | Production build              |
| Start           | `npm start`               | Starts production server      |
| Lint            | `npm run lint`            | Runs ESLint                   |
| Prisma Generate | `npm run prisma:generate` | Generates Prisma client       |
| Prisma Push     | `npm run prisma:push`     | Pushes schema to database     |
