import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function EventCard({ event }: { event: any }) {
  return (
    <Card className="p-4 mb-4">
      <h3 className="font-bold text-lg">{event.title}</h3>
      <div>{new Date(event.date).toLocaleString()}</div>
      <div>{event.location}</div>
      <div>₹{event.price}</div>
      <Link href={`/events/${event.id}`} className="text-blue-500 underline">Details</Link>
    </Card>
  );
}
