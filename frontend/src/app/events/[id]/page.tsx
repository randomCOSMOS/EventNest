"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { api, setAuthToken } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    api.get(`/events/${id}`).then(res => setEvent(res.data));
  }, [id]);

  useEffect(() => { setAuthToken(token || null); }, [token]);

  const handleBook = async () => {
    setError(""); setSuccess("");
    if (!user) return router.push("/auth/login");
    try {
      await api.post("/bookings", { event_id: id });
      setSuccess("Booking successful!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Booking failed");
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto mt-8 space-y-4">
      <h2 className="text-2xl font-bold">{event.title}</h2>
      <div>{event.description}</div>
      <div>Date: {new Date(event.date).toLocaleString()}</div>
      <div>Location: {event.location}</div>
      <div>Price: ₹{event.price}</div>
      {success && <div className="text-green-600">{success}</div>}
      {error && <div className="text-red-600">{error}</div>}
      <Button onClick={handleBook}>Book Now</Button>
    </div>
  );
}
