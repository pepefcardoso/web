import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeedbackItem } from "@/types/feedback";
import { VoteButton } from "./vote-button";

export function FeedbackCard({ feedback }: { feedback: FeedbackItem }) {
    return (
        <Link href={`/feedback/${feedback.id}`} className="block group">
            <Card className="flex items-start p-4 gap-4 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer">

                <VoteButton
                    initialVoteCount={feedback.voteCount}
                    initialHasVoted={feedback.hasVoted}
                    feedbackId={feedback.id}
                />

                <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg mb-1 truncate group-hover:text-blue-600 transition-colors">
                        {feedback.title}
                    </CardTitle>
                    <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                        {feedback.description}
                    </p>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">
                            {feedback.category}
                        </Badge>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                    <Badge variant="outline" className="text-slate-500 font-medium capitalize">
                        {feedback.status.toLowerCase().replace('_', ' ')}
                    </Badge>
                </div>
            </Card>
        </Link>
    );
}