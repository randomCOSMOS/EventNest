"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { api, setAuthToken } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ParticipantList from "@/components/ParticipantList";

export default function DashboardPage() {
  const { user, token } = useAuth();
  const [myBookings, setMyBookings] = useState<any[]>([]);
  const [myEvents, setMyEvents] = useState<any[]>([]);
  const [participants, setParticipants] = useState<{ [eventId: number]: any[] }>({});
  const [activeEvent, setActiveEvent] = useState<number | null>(null);

  useEffect(() => { setAuthToken(token || null); }, [token]);

  useEffect(() => {
    if (token) {
      api.get("/bookings").then(res => setMyBookings(res.data));
      api.get("/events").then(res => {
        // Filter events created by the user
        const mine = res.data.filter((ev: any) => ev.created_by === user?.id);
        setMyEvents(mine);
      });
    }
  }, [token, user]);

  const handleShowParticipants = async (eventId: number) => {
    if (participants[eventId]) {
      setActiveEvent(activeEvent === eventId ? null : eventId);
      return;
    }
    try {
      const res = await api.get(`/events/${eventId}/participants`);
      setParticipants((prev) => ({ ...prev, [eventId]: res.data }));
      setActiveEvent(eventId);
    } catch (err: any) {
      alert(err.response?.data?.message || "Could not fetch participants.");
    }
  };

  if (!user) return <div className="mt-8 text-center">Please log in.</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Events You're Attending</h2>
        {myBookings.length === 0 ? <div>No bookings yet.</div> :
          myBookings.map(booking => (
            <Card key={booking.id} className="p-4 mb-2">
              <div className="font-semibold">{booking.title}</div>
              <div className="text-gray-500">{new Date(booking.date).toLocaleString()}</div>
              <div className="text-gray-500">{booking.location}</div>
            </Card>
          ))
        }
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Your Events</h2>
        {myEvents.length === 0 ? <div>You haven't created any events.</div> :
          myEvents.map(event => (
            <Card key={event.id} className="p-4 mb-2">
              <div className="font-semibold">{event.title}</div>
              <div className="text-gray-500">{new Date(event.date).toLocaleString()}</div>
              <div className="text-gray-500">{event.location}</div>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => handleShowParticipants(event.id)}
              >
                {activeEvent === event.id ? "Hide Participants" : "Show Participants"}
              </Button>
              {activeEvent === event.id && (
                <ParticipantList participants={participants[event.id] || []} />
              )}
            </Card>
          ))
        }
      </div>
    </div>
  );
}
