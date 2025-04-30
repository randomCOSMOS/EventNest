"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import EventCard from "@/components/EventCard";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

type SortOption = "date-asc" | "date-desc" | "price-asc" | "price-desc" | "title-asc" | "title-desc";

const sortEvents = (events: any[], sort: SortOption) => {
  return [...events].sort((a, b) => {
    switch (sort) {
      case "date-asc":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "date-desc":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "price-asc":
        return Number(a.price) - Number(b.price);
      case "price-desc":
        return Number(b.price) - Number(a.price);
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });
};

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [sort, setSort] = useState<SortOption>("date-asc");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useAuth();
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

  const filteredEvents = events.filter(ev =>
    ev.title.toLowerCase().includes(search.toLowerCase())
  );
  const sortedEvents = sortEvents(filteredEvents, sort);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <Card className="bg-neutral-800 border-none shadow-md p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
          <h2 className="text-2xl font-bold text-neutral-100">Available Events</h2>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search by title"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-40 bg-neutral-900 text-neutral-100 border-neutral-700"
            />
            <span className="text-sm text-neutral-400">Sort by:</span>
            <Select value={sort} onValueChange={val => setSort(val as SortOption)}>
              <SelectTrigger className="w-40 bg-neutral-900 text-neutral-100 border-neutral-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 text-neutral-100">
                <SelectGroup>
                  <SelectLabel>Date</SelectLabel>
                  <SelectItem value="date-asc">Earliest</SelectItem>
                  <SelectItem value="date-desc">Latest</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Price</SelectLabel>
                  <SelectItem value="price-asc">Low to High</SelectItem>
                  <SelectItem value="price-desc">High to Low</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Title</SelectLabel>
                  <SelectItem value="title-asc">A-Z</SelectItem>
                  <SelectItem value="title-desc">Z-A</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {user && (
            <a
              href="/events/create"
              className="px-4 py-2 bg-neutral-700 text-white rounded hover:scale-105 transition whitespace-nowrap font-semibold"
              style={{ minWidth: "fit-content" }}
            >
              + Create Event
            </a>
          )}
        </div>
        {success && <div className="text-green-400 mb-2">{success}</div>}
        {error && <div className="text-red-400 mb-2">{error}</div>}
        {sortedEvents.length === 0 ? (
          <div className="text-neutral-400">No events found.</div>
        ) : (
          sortedEvents.map(event => (
            <EventCard key={event.id} event={event} onBook={() => handleBook(event.id)} />
          ))
        )}
      </Card>
    </div>
  );
}
