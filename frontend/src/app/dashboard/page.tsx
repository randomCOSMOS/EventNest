"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { api, setAuthToken } from "@/lib/api";
import BookingCard from "@/components/BookingCard";

export default function DashboardPage() {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => { setAuthToken(token || null); }, [token]);
  useEffect(() => {
    if (token) {
      api.get("/bookings").then(res => setBookings(res.data));
    }
  }, [token]);

  const handleCancel = async (id: number) => {
    try {
      await api.delete(`/bookings/${id}`);
      setBookings(bookings.filter(b => b.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Cancel failed");
    }
  };

  if (!user) return <div className="mt-8 text-center">Please log in.</div>;

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {error && <div className="text-red-500">{error}</div>}
      {bookings.length === 0 ? <div>No bookings yet.</div> :
        bookings.map(booking =>
          <BookingCard key={booking.id} booking={booking} onCancel={handleCancel} />
        )
      }
    </div>
  );
}
