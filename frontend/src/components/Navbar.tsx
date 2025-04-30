"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "./AuthProvider";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-neutral-900/95 backdrop-blur border-b border-neutral-800 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center group">
          <Image
            src="/eventnest logo.png"
            alt="EventNest Logo"
            width={110}
            height={32}
            className="object-contain h-8 w-auto group-hover:scale-105 transition"
            priority
          />
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/events">
            <Button variant="ghost" className="font-semibold text-neutral-100 hover:bg-neutral-800">Book Events</Button>
          </Link>
          {user && (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="font-semibold text-neutral-100 hover:bg-neutral-800">Dashboard</Button>
              </Link>
              <Link href="/events/create">
                <Button variant="ghost" className="font-semibold text-neutral-100 hover:bg-neutral-800">Create Event</Button>
              </Link>
            </>
          )}
          {user?.is_admin && (
            <Link href="/admin">
              <Button variant="ghost" className="font-semibold text-neutral-400 hover:bg-neutral-800">Admin</Button>
            </Link>
          )}
          {!user ? (
            <>
              <Link href="/auth/login">
                <Button variant="outline" className="border-neutral-500 text-neutral-300 hover:bg-neutral-800">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button
                  variant="default"
                  className="bg-neutral-700 text-white shadow hover:scale-105 transition"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Avatar className="ml-2 ring-2 ring-neutral-700">
                <AvatarImage src="/icon.png" />
                <AvatarFallback>{user.email[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <Button variant="secondary" onClick={logout} className="bg-neutral-800 text-neutral-100 hover:bg-neutral-900">Logout</Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
