"use client";
import { apiClient, AppError } from "@/lib/api-client";

export default function LoginPage() {
  const handleLogin = async () => {
    try {
      await apiClient("/sessions", {
        method: "POST",
        body: JSON.stringify({ email: "...", password: "..." })
      });
    } catch (error) {
      if (error instanceof AppError) {
        console.error(error.message);
      }
    }
  };

  return (
    <main className="container mx-auto p-4 max-w-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <div className="border p-6 rounded-md">
        <p className="text-gray-500">
          Login form will be implemented here (Task 4.x).
        </p>
      </div>
    </main>
  );
}
