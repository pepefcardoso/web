import { redirect } from "next/navigation";

export class AppError extends Error {
  public readonly status: number;
  public readonly errors?: any;

  constructor(message: string, status: number, errors?: any) {
    super(message);
    this.status = status;
    this.name = "AppError";
    this.errors = errors;
  }
}

export interface ApiResponse<T = any> {
  status: string;
  data: T;
}

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
  skipRedirect?: boolean;
}

/**
 * Unified API Client for Server and Client Components.
 * Automatically handles cookie injection, 401 redirects, envelope unwrapping, and standardizes errors.
 */
export async function apiClient<T = unknown>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const isServer = typeof window === "undefined";

  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/api";

  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const config: RequestInit = {
    cache: "no-store",
    ...options,
    headers,
    credentials: "include",
  };

  if (isServer) {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const allCookies = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

      if (allCookies) {
        headers.set("Cookie", allCookies);
      }
    } catch (error) {
      console.warn("Failed to attach cookies on the server:", error);
    }
  }

  let url = `${baseUrl}${endpoint}`;
  if (options.params) {
    const searchParams = new URLSearchParams(options.params);
    url += `?${searchParams.toString()}`;
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorData: { message?: string; errors?: any } = {};
    try {
      errorData = await response.json();
    } catch {
      // Ignored: Response is not JSON
    }

    if (response.status === 401) {
      if (options.skipRedirect) {
        throw new AppError("Unauthorized", 401);
      }
      if (isServer) {
        redirect("/login");
      } else {
        window.location.href = "/login";
        return new Promise(() => {});
      }
    }

    throw new AppError(
      errorData.message ||
        response.statusText ||
        "An unexpected error occurred",
      response.status,
      errorData.errors,
    );
  }

  if (response.status === 204) {
    return {} as T;
  }

  const json = await response.json();

  return json.data !== undefined ? (json.data as T) : (json as T);
}
