"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { api, setAuthToken } from "@/lib/api";
import { Card } from "@/components/ui/card";

export default function AdminPage() {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => { setAuthToken(token || null); }, [token]);
  useEffect(() => {
    if (user?.is_admin && token) {
      api.get("/admin/bookings").then(res => setBookings(res.data));
    }
  }, [user, token]);

  if (!user?.is_admin) return <div className="mt-8 text-center">Admin access only.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
      {error && <div className="text-red-500">{error}</div>}
      {bookings.length === 0 ? <div>No bookings yet.</div> :
        bookings.map(booking =>
          <Card key={booking.id} className="p-4 mb-2">
            <div>User: {booking.user_id}, Event: {booking.event_id}, Paid: {booking.paid ? "Yes" : "No"}</div>
          </Card>
        )
      }
    </div>
  );
}
