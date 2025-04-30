"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function RegisterPage() {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/register", { name, email, password });
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <Card className="w-full max-w-sm p-8 bg-neutral-800 border-none shadow-xl flex flex-col items-center">
        <Image src="/icon.png" alt="EventNest Icon" width={48} height={48} className="mb-2" />
        <h2 className="text-2xl font-bold mb-4 text-neutral-200">Sign Up</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <Input
            className="bg-neutral-900 text-neutral-100 border-neutral-700"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <Input
            className="bg-neutral-900 text-neutral-100 border-neutral-700"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            type="email"
          />
          <Input
            className="bg-neutral-900 text-neutral-100 border-neutral-700"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-neutral-400 text-sm">{error}</div>}
          <Button
            type="submit"
            className="w-full bg-neutral-700 text-white font-semibold shadow hover:scale-105 transition"
          >
            Sign Up
          </Button>
        </form>
        <div className="my-4 w-full flex items-center gap-2">
          <div className="flex-1 h-px bg-neutral-700" />
          <span className="text-xs text-neutral-500">OR</span>
          <div className="flex-1 h-px bg-neutral-700" />
        </div>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-neutral-700"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          <Image src="/google-icon.png" alt="Google" width={20} height={20} />
          Sign up with Google
        </Button>
        <div className="text-sm text-center mt-4 text-neutral-400">
          Already have an account?{" "}
          <a href="/auth/login" className="text-neutral-200 hover:underline">Login</a>
        </div>
      </Card>
    </div>
  );
}
