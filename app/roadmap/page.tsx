import { apiClient } from "@/lib/api-client";
import { FeedbackListResponse } from "@/types/feedback";
import { Badge } from "@/components/ui/badge";
import { FeedbackCard } from "@/components/feedback/feedback-card";

export const dynamic = "force-dynamic";

export default async function RoadmapPage() {
    let response: FeedbackListResponse | null = null;

    try {
        response = await apiClient<FeedbackListResponse>("/feedbacks", {
            params: { limit: "100", sortBy: "votes", order: "desc" }
        });
    } catch (error) {
        console.error("Failed to fetch roadmap data:", error);
    }

    const feedbacks = response?.data || [];

    const planned = feedbacks.filter(f => f.status === "PLANNED");
    const inProgress = feedbacks.filter(f => f.status === "IN_PROGRESS");
    const completed = feedbacks.filter(f => f.status === "COMPLETED");

    const columns = [
        { title: "Planned", items: planned, color: "bg-blue-100 text-blue-800" },
        { title: "In Progress", items: inProgress, color: "bg-orange-100 text-orange-800" },
        { title: "Completed", items: completed, color: "bg-green-100 text-green-800" }
    ];

    return (
        <main className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Roadmap</h1>
                <p className="text-muted-foreground">See what we&apos;re currently working on and what&apos;s coming next.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {columns.map((col) => (
                    <section key={col.title} className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 mb-2">
                            <h2 className="text-lg font-semibold">{col.title}</h2>
                            <Badge variant="secondary" className={col.color}>
                                {col.items.length}
                            </Badge>
                        </div>

                        {col.items.length === 0 ? (
                            <div className="p-6 bg-muted/30 border border-dashed rounded-lg text-center text-sm text-muted-foreground">
                                No items in this status.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {col.items.map(feedback => (
                                    <FeedbackCard key={feedback.id} feedback={feedback} />
                                ))}
                            </div>
                        )}
                    </section>
                ))}
            </div>
        </main>
    );
}