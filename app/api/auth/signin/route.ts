import { signIn } from "@/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (res?.error) {
    return new Response(JSON.stringify({ error: res.error }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(res), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
