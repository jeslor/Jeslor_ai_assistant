# 🤖 Jeslor AI Assistant

A simple AI chatbot built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Gemini API**, **Vercel AI SDK**, and **Vapi** for voice input/output. 💬

## ✨ Features

- 💡 Google Gemini-powered responses
- ⚡ Streamed replies via Vercel AI SDK
- 🎨 Beautiful UI with Tailwind CSS
- 🔊 Optional voice interaction via Vapi
- 🌐 Easily deployable to Vercel

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Gemini API](https://ai.google.dev/)
- [Vercel AI SDK](https://vercel.com/docs/ai)
- [Vapi](https://vapi.ai/)

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/jeslor_ai_assistant.git
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
