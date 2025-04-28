"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import EventCard from "@/components/EventCard";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    api.get("/events").then(res => setEvents(res.data));
  }, []);

  const handleBook = async (eventId: number) => {
    setError(""); setSuccess("");
    if (!user) return router.push("/auth/login");
    try {
      await api.post("/bookings", { event_id: eventId });
      setSuccess("Booking successful!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Available Events</h2>
        {user && <a href="/events/create" className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">+ Create Event</a>}
      </div>
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {events.length === 0 ? <div>No events found.</div> :
        events.map(event =>
          <EventCard key={event.id} event={event} onBook={() => handleBook(event.id)} />
        )
      }
    </div>
  );
}
