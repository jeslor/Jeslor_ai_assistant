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

Create a `.env.local` file at the root of the project and add your keys:

```env
NEXT_PUBLIC_LOGO_TOKEN=your_logokit_token_here
# ...other env variables
```

---

## 🖼️ LogoKit Setup

This project uses [LogoKit](https://logokit.com) to display company logos on interview cards.

### Steps to get your LogoKit token

1. Go to [https://logokit.com](https://logokit.com) and click **Sign Up**.
2. Create an account using your email or a social login.
3. Once logged in, navigate to your **Dashboard**.
4. Locate your **API Token** (sometimes listed under _Settings_ or _API Keys_).
5. Copy the token and paste it into your `.env.local` file:

```env
NEXT_PUBLIC_LOGO_TOKEN=your_token_here
```

> **Note:** The `NEXT_PUBLIC_` prefix is required for the token to be accessible in the browser (client-side components). Without it, Next.js will strip the value and it will appear as `undefined`.

Logo URLs are constructed like this:

```
https://img.logokit.com/{company-name}?token=YOUR_TOKEN&size=80x80&format=png
```
