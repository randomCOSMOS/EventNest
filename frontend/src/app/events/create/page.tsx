"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/AuthProvider";

export default function CreateEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/events", { title, description, location, date, price });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Event creation failed");
    }
  };

  if (!user) return <div className="mt-8 text-center text-neutral-200">Please log in to create events.</div>;

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <Card className="w-full max-w-md p-8 bg-neutral-800 border-none shadow-xl flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-neutral-200">Create Event</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <Input
            className="bg-neutral-900 text-neutral-100 border-neutral-700"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <Input
            className="bg-neutral-900 text-neutral-100 border-neutral-700"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <Input
            className="bg-neutral-900 text-neutral-100 border-neutral-700"
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
          />
          <Input
            className="bg-neutral-900 text-neutral-100 border-neutral-700"
            type="datetime-local"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
          <Input
            className="bg-neutral-900 text-neutral-100 border-neutral-700"
            type="number"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
          {error && <div className="text-neutral-400 text-sm">{error}</div>}
          <Button
            type="submit"
            className="w-full bg-neutral-700 text-white font-semibold shadow hover:scale-105 transition"
          >
            Create Event
          </Button>
        </form>
      </Card>
    </div>
  );
}
