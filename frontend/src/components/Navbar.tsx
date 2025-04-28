"use client";
import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="flex items-center justify-between p-4 shadow">
      <div>
        <Link href="/" className="font-bold text-xl">EventNest</Link>
      </div>
      <div className="space-x-4">
        <Link href="/events">Events</Link>
        {user && <Link href="/dashboard">Dashboard</Link>}
        {user?.is_admin && <Link href="/admin">Admin</Link>}
        {!user ? (
          <>
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Register</Link>
          </>
        ) : (
          <Button variant="outline" onClick={logout}>Logout</Button>
        )}
      </div>
    </nav>
  );
}
