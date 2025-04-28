"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

  if (!user) return <div className="mt-8 text-center">Please log in to create events.</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-8 bg-white rounded shadow space-y-4">
      <h2 className="text-2xl font-bold mb-2">Create Event</h2>
      <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <Input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
      <Input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required />
      <Input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required />
      <Input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
      {error && <div className="text-red-500">{error}</div>}
      <Button type="submit" className="w-full">Create Event</Button>
    </form>
  );
}
