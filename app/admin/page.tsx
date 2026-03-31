import { apiClient } from "@/lib/api-client";

export default async function AdminDashboardPage() {
  const data = await apiClient("/admin-data");
  return <div>{JSON.stringify(data)}</div>;
}
