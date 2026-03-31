import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Feedback Hub</h1>
      <p className="mb-6 text-gray-600">
        Welcome to the Feedback Suggestion Feed.
      </p>

      <nav className="flex gap-4 mb-8 pb-4 border-b">
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
        <Link href="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
        <Link href="/admin" className="text-blue-600 hover:underline">
          Admin Dashboard
        </Link>
      </nav>

      <div className="border p-6 rounded-md bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">
          Recent Feedback (Placeholder)
        </h2>
        <ul className="space-y-2">
          <li>
            <Link href="/feedback/1" className="text-blue-600 hover:underline">
              Implement Dark Mode (ID: 1)
            </Link>
          </li>
          <li>
            <Link href="/feedback/2" className="text-blue-600 hover:underline">
              Fix pagination on mobile (ID: 2)
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
