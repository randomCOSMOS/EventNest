"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import EventCard from "@/components/EventCard";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    api.get("/events").then(res => setEvents(res.data));
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Events</h2>
      {events.map(event => <EventCard key={event.id} event={event} />)}
    </div>
  );
}
