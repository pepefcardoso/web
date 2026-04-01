"use client";

import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { apiClient } from "@/lib/api-client";

interface VoteButtonProps {
    initialVoteCount: number;
    initialHasVoted: boolean;
    feedbackId: string;
}

export function VoteButton({ initialVoteCount, initialHasVoted, feedbackId }: VoteButtonProps) {
    const [isVoted, setIsVoted] = useState(initialHasVoted);
    const [count, setCount] = useState(initialVoteCount);

    const handleVote = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const newVotedState = !isVoted;
        const newCount = newVotedState ? count + 1 : count - 1;

        setIsVoted(newVotedState);
        setCount(newCount);

        try {
            await apiClient(`/feedbacks/${feedbackId}/vote`, {
                method: "POST",
                body: JSON.stringify({ type: "UPVOTE" }),
            });
        } catch (error) {
            setIsVoted(!newVotedState);
            setCount(count);
            console.error("Failed to update vote", error);
        }
    };

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={handleVote}
            className={`flex flex-col items-center p-2 transition-colors rounded-lg min-w-[48px] ${isVoted
                    ? "bg-blue-100 hover:bg-blue-200"
                    : "bg-slate-50 hover:bg-blue-50 group-hover:bg-blue-50"
                }`}
        >
            <ChevronUp
                className={`h-5 w-5 ${isVoted ? "text-blue-700" : "text-slate-500 group-hover:text-blue-600"
                    }`}
            />
            <span
                className={`font-semibold text-sm ${isVoted ? "text-blue-700" : "text-slate-700 group-hover:text-blue-700"
                    }`}
            >
                {count}
            </span>
        </div>
    );
}