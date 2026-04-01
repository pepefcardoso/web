import { CommentItem } from "@/types/comment";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface CommentListProps {
    comments: CommentItem[];
}

export function CommentList({ comments }: CommentListProps) {
    if (comments.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {comments.map((comment) => {
                const formattedDate = new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                }).format(new Date(comment.createdAt));

                const initials = comment.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase();

                return (
                    <div key={comment.id} className="flex gap-4">
                        <Avatar className="h-10 w-10 shrink-0">
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold text-foreground">
                                    {comment.author.name}
                                </h4>
                                <span className="text-xs text-muted-foreground">{formattedDate}</span>
                            </div>
                            <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                                {comment.content}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}