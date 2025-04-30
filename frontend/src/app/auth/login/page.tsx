"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { api, setAuthToken } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token, res.data.user);
      setAuthToken(res.data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-16 p-8 bg-white rounded shadow space-y-4">
      <h2 className="text-2xl font-bold mb-2">Login</h2>
      <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      {error && <div className="text-red-500">{error}</div>}
      <Button type="submit" className="w-full">Login</Button>
      <div className="text-sm text-center mt-2">
        Don't have an account? <a href="/auth/register" className="text-blue-600 hover:underline">Sign Up</a>
      </div>
      <Button type="button" className="w-full mt-2" onClick={() => signIn("google")}>
        Sign in with Google
      </Button>
    </form>
  );
}
