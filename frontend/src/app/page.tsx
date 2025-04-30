import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-2xl p-8 flex flex-col items-center shadow-2xl bg-neutral-800 border-none">
        <Image
          src="/eventnest logo.png"
          alt="EventNest Logo"
          width={180}
          height={60}
          className="mb-6 object-contain"
          priority
        />
        <p className="text-lg text-neutral-200 mb-8 text-center">
          Effortless event creation & booking.<br />
          Discover, host, and join amazing events in your community!
        </p>
        <div className="flex gap-4">
          <a
            href="/events"
            className="px-6 py-2 rounded-lg bg-neutral-700 text-white font-semibold shadow hover:scale-105 transition"
          >
            Book Events
          </a>
          <a
            href="/auth/login"
            className="px-6 py-2 rounded-lg border border-neutral-500 text-neutral-300 font-semibold bg-neutral-900 shadow hover:bg-neutral-800 transition"
          >
            Login
          </a>
        </div>
      </Card>
    </div>
  );
}
