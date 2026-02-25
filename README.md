# 🤖 Jeslor AI Assistant

Jeslor-assistant is a voice-enabled AI chatbot built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Google Gemini API**, **Vapi**, **Vercel AI SDK**, and **NextAuth**. It simulates mock technical interviews using voice or text.

 <a href="https://www.assistant.jeslor.com" target="_blank" rel="noopener noreferrer">🌐 Try Demo</a>
---

## ✨ Features

- 💡 AI-powered by Google Gemini
- 🎙️ Voice conversations via Vapi
- 🧠 Collects mock interview setup data
- 🔐 Auth via NextAuth.js (Credentials, github and google)
- 🎨 Styled with Tailwind CSS
- ⚡ Streamed responses using Vercel AI SDK
- ☁️ Easy to deploy on Vercel

---

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Generative AI (Gemini)](https://ai.google.dev/)
- [Vercel AI SDK](https://vercel.com/docs/ai)
- [Vapi](https://vapi.ai/)
- [NextAuth.js](https://next-auth.js.org/)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/jeslor/jeslor_ai_assistant.git
cd jeslor_ai_assistant
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file at the root of the project and add all required keys:

```env
# ── Database ──────────────────────────────────────────────────────────────────
DATABASE_URL=your_mongodb_connection_string

# ── NextAuth ──────────────────────────────────────────────────────────────────
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

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

# ── LogoKit (client-side) ─────────────────────────────────────────────────────
NEXT_PUBLIC_LOGO_TOKEN=your_logokit_token
```

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

This key is used by the `@ai-sdk/google` package to generate interview questions and analyse feedback via the Gemini model.

1. Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey).
2. Click **Create API key**.
3. Copy the key and paste it as `GOOGLE_GENERATIVE_AI_API_KEY`.

---

### `NEXT_PUBLIC_VAPI_WEB_TOKEN` — Vapi Voice AI

1. Go to [https://dashboard.vapi.ai](https://dashboard.vapi.ai) and sign up.
2. From the dashboard, navigate to **API Keys** or **Settings**.
3. Copy your **Web Token** (the public/client-side token, not the private API key).

> **Note:** The `NEXT_PUBLIC_` prefix exposes this value to the browser. Never use your private Vapi API key here.

---

### `NEXT_PUBLIC_LOGO_TOKEN` — LogoKit

Used to display company logos on interview cards.

1. Go to [https://logokit.com](https://logokit.com) and click **Sign Up**.
2. Once logged in, navigate to your **Dashboard** → **API Keys** (or **Settings**).
3. Copy your **API Token**.

Logo URLs are constructed like this:

```
https://img.logokit.com/{company-name}?token=YOUR_TOKEN&size=80x80&format=png
```

> **Note:** The `NEXT_PUBLIC_` prefix is required so the token is accessible in client-side components.
