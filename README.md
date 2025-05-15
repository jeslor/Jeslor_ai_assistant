# 🤖 Jeslor AI Assistant

Jeslor-assistant is a voice-enabled AI chatbot built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Google Gemini API**, **Vapi**, **Vercel AI SDK**, and **NextAuth**. It simulates mock technical interviews using voice or text.

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

### 2. Install Dependencies

```bash
npm install
```

---

## 📄 Environment Variables

Create a `.env` file in the root directory and add the following:

```env
GOOGLE_GENERATIVE_AI_API_KEY=""
NEXT_PUBLIC_VAPI_WEB_TOKEN=""
NEXT_PUBLIC_VAPI_WORKFLOW_ID=""
DATABASE_URL=""
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"
GITHUB_ID=""
GITHUB_SECRET=""
```

---

## 🔐 Set Up Authentication with NextAuth

### Step 1: Install NextAuth

```bash
npm install next-auth@beta
```

### Step 2: Create the Auth API Route

Create the file: `app/api/auth/[...nextauth].ts`

add Auth js

```ts
Go to [check procedure ](https://authjs.dev/getting-started)
```

### Step 3: Register a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App:
   - Homepage: `http://localhost:3000`
   - Callback URL: `http://localhost:3000/api/auth/callback/github`
3. Paste the **Client ID** and **Client Secret** into `.env`

---

## 🧠 Set Up Google Generative AI (Gemini API)

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **“Get API Key”**
4. Copy it and paste into your `.env`:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
```

---

## 🎙️ Set Up Vapi Voice Workflow

### Step 1: Create a Vapi Account

1. Go to [https://vapi.ai](https://vapi.ai) and sign up
2. Open your [Vapi Dashboard](https://app.vapi.ai/dashboard)

---

### Step 2: Create a Workflow

1. Go to the **Workflows** tab → Click **"New Workflow"**
2. Add the following actions:

#### Workflow Steps:

- **Say**:

  > "Welcome to Jeslor! I will ask you a few questions to prepare your mock interview."

- **Collect**:

  - "What role are you interviewing for?"
  - "What is your experience level?"
  - "What is your tech stack?"
  - "How many questions would you like in the interview?"
  - "Which company are you preparing for?"

- **Call API**:

  - Set the API URL to your endpoint (e.g., `https://your-domain.com/api/start-interview`)
  - Method: `POST`
  - Body: Send collected values as JSON

- **Say**:

  > "Your interview has been generated. Good luck!"

- **Hang Up**:
  - End the call

3. Save and publish the workflow
4. Copy the Workflow ID and paste into `.env`:

```env
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_workflow_id
```

---

### Step 3: Create a Vapi Assistant

1. Go to the **Assistants** tab → Click **"Create Assistant"**
2. Fill out the following:

   - Name: _Jeslor Assistant_
   - Model: **Vapi**
   - Workflow: Select the one you just created

3. Save the assistant

---

### Step 4: Get the Vapi Web Token

1. Go to **Settings > API** in Vapi dashboard
2. Generate your Web Token
3. Paste it into `.env`:

```env
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_web_token
```

---

## 🧪 Run the App Locally

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deploying to Vercel

1. Push your project to GitHub
2. Go to [https://vercel.com](https://vercel.com) and import your GitHub repo
3. Set all environment variables in the Vercel dashboard
4. Click **Deploy**

---

## ✅ Sample `.env` Template

```env
GOOGLE_GENERATIVE_AI_API_KEY="your_google_api_key"
NEXT_PUBLIC_VAPI_WEB_TOKEN="your_vapi_web_token"
NEXT_PUBLIC_VAPI_WORKFLOW_ID="your_workflow_id"
DATABASE_URL="your_database_connection_string"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 📄 License

MIT License – Free to use and modify.
