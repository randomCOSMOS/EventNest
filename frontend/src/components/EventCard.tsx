import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EventCard({ event, onBook }: { event: any, onBook?: () => void }) {
  return (
    <Card className="p-4 mb-4 flex flex-col gap-2">
      <div className="font-semibold text-lg">{event.title}</div>
      <div className="text-gray-500">{new Date(event.date).toLocaleString()}</div>
      <div className="text-gray-500">{event.location}</div>
      <div className="text-gray-700">₹{event.price}</div>
      <div className="flex gap-2 mt-2">
        {onBook && <Button onClick={onBook}>Book</Button>}
        <Link href={`/events/${event.id}`} className="text-blue-600 hover:underline text-sm">Details</Link>
      </div>
    </Card>
  );
}
