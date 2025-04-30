"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { api, setAuthToken } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ParticipantList from "@/components/ParticipantList";
import { Badge } from "@/components/ui/badge";
import { Users, CalendarCheck, UserPlus } from "lucide-react"; // lucide icons for visual pop

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

  if (!user) return <div className="mt-8 text-center text-neutral-200">Please log in.</div>;

  return (
    <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Events You're Attending */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <CalendarCheck className="w-6 h-6 text-neutral-400" />
          <h2 className="text-xl font-bold text-neutral-100">Events You're Attending</h2>
        </div>
        {myBookings.length === 0 ? (
          <Card className="p-4 mb-2 bg-neutral-800 border-none text-neutral-400">No bookings yet.</Card>
        ) : (
          myBookings.map(booking => (
            <Card key={booking.id} className="p-4 mb-3 bg-neutral-800 border-none shadow hover:shadow-lg transition">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-neutral-500" />
                <div className="font-semibold text-neutral-100">{booking.title}</div>
              </div>
              <div className="text-neutral-400 text-sm">{new Date(booking.date).toLocaleString()}</div>
              <div className="text-neutral-400 text-sm">{booking.location}</div>
            </Card>
          ))
        )}
      </section>
      {/* Your Events */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-6 h-6 text-neutral-400" />
          <h2 className="text-xl font-bold text-neutral-100">Your Events</h2>
        </div>
        {myEvents.length === 0 ? (
          <Card className="p-4 mb-2 bg-neutral-800 border-none text-neutral-400">You haven't created any events.</Card>
        ) : (
          myEvents.map(event => (
            <Card key={event.id} className="p-4 mb-3 bg-neutral-800 border-none shadow hover:shadow-lg transition">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-100">{event.title}</span>
                {/* Badge for participant count */}
                <Badge className="ml-2 bg-neutral-700 text-xs font-normal text-neutral-300">
                  {event.participant_count !== undefined
                    ? `${event.participant_count} participant${event.participant_count === 1 ? "" : "s"}`
                    : "0 participants"}
                </Badge>
              </div>
              <div className="text-neutral-400 text-sm">{new Date(event.date).toLocaleString()}</div>
              <div className="text-neutral-400 text-sm">{event.location}</div>
              <Button
                variant="outline"
                className={`mt-3 w-full transition-all duration-200 ${activeEvent === event.id ? "border border-neutral-400 bg-neutral-900" : ""}`}
                onClick={() => handleShowParticipants(event.id)}
              >
                {activeEvent === event.id ? "Hide Participants" : "Show Participants"}
              </Button>
              <div className={`transition-all duration-300 ${activeEvent === event.id ? "max-h-96 opacity-100 py-2" : "max-h-0 opacity-0 overflow-hidden py-0"}`}>
                {activeEvent === event.id && (
                  <ParticipantList participants={participants[event.id] || []} />
                )}
              </div>
            </Card>
          ))
        )}
      </section>
    </div>
  );
}
