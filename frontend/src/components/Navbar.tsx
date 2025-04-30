"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "./AuthProvider";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="flex items-center justify-between px-4 py-3 border-b bg-white">
      <Link href="/" className="flex items-center">
        <Image 
          src="/eventnest logo.png" 
          alt="EventNest Logo" 
          width={120} 
          height={40} 
          className="object-contain" 
        />
      </Link>
      <div className="space-x-4">
        <Link href="/events" className="text-gray-700 hover:underline">Book Events</Link>
        {user && <Link href="/dashboard" className="text-gray-700 hover:underline">Dashboard</Link>}
        {user && <Link href="/events/create" className="text-gray-700 hover:underline">Create Event</Link>}
        {user?.is_admin && <Link href="/admin" className="text-gray-700 hover:underline">Admin</Link>}
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
