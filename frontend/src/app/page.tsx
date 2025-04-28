export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-2 tracking-tight">EventNest</h1>
      <p className="text-lg text-gray-600 mb-8">Effortless event creation & booking.</p>
      <div className="flex gap-4">
        <a href="/events" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Book Events</a>
        <a href="/auth/login" className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">Login</a>
      </div>
    </div>
  );
}
