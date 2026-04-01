"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { apiClient, AppError } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const commentSchema = z.object({
    content: z.string().min(3, "Comment must be at least 3 characters").max(1000, "Comment is too long"),
});

type CommentFormValues = z.infer<typeof commentSchema>;

interface CommentFormProps {
    feedbackId: string;
}

export function CommentForm({ feedbackId }: CommentFormProps) {
    const router = useRouter();
    const [globalError, setGlobalError] = useState<string | null>(null);

    const form = useForm<CommentFormValues>({
        resolver: zodResolver(commentSchema),
        defaultValues: { content: "" },
    });

    const onSubmit = async (data: CommentFormValues) => {
        setGlobalError(null);
        try {
            await apiClient(`/feedbacks/${feedbackId}/comments`, {
                method: "POST",
                body: JSON.stringify(data),
            });

            form.reset();
            router.refresh();
        } catch (err) {
            if (err instanceof AppError) {
                setGlobalError(err.message);
            } else {
                setGlobalError("An unexpected error occurred while posting your comment.");
            }
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Textarea
                    placeholder="Add a comment..."
                    {...form.register("content")}
                    className="w-full min-h-[100px] resize-y"
                    disabled={form.formState.isSubmitting}
                />
                {form.formState.errors.content && (
                    <p className="text-sm text-destructive">{form.formState.errors.content.message}</p>
                )}
            </div>

            {globalError && <p className="text-sm text-destructive font-medium">{globalError}</p>}

            <div className="flex justify-end">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Posting..." : "Post Comment"}
                </Button>
            </div>
        </form>
    );
}