"use client";
import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="flex items-center justify-between px-4 py-3 border-b bg-white">
      <Link href="/" className="font-bold text-xl tracking-tight text-gray-900">EventNest</Link>
      <div className="space-x-4">
        <Link href="/events" className="text-gray-700 hover:underline">Book Events</Link>
        {user && <Link href="/dashboard" className="text-gray-700 hover:underline">Dashboard</Link>}
        {user && <Link href="/events/create" className="text-gray-700 hover:underline">Create Event</Link>}
        {!user ? (
          <>
            <Link href="/auth/login" className="text-gray-700 hover:underline">Login</Link>
            <Link href="/auth/register" className="text-gray-700 hover:underline">Sign Up</Link>
          </>
        ) : (
          <Button variant="outline" onClick={logout}>Logout</Button>
        )}
      </div>
    </nav>
  );
}
