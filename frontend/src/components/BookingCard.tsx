import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BookingCard({ booking, onCancel }: { booking: any, onCancel: (id: number) => void }) {
  return (
    <Card className="p-4 mb-2">
      <div className="font-bold">{booking.title}</div>
      <div>Date: {new Date(booking.date).toLocaleString()}</div>
      <div>Location: {booking.location}</div>
      <Button variant="destructive" onClick={() => onCancel(booking.id)}>Cancel</Button>
    </Card>
  );
}
