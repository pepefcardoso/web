"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function FeedbackSort() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentSort = searchParams.get("sortBy") || "createdAt";
    const currentOrder = searchParams.get("order") || "desc";
    const value = `${currentSort}-${currentOrder}`;

    const onValueChange = (val: string) => {
        const [sortBy, order] = val.split("-");
        const params = new URLSearchParams(searchParams.toString());

        params.set("sortBy", sortBy);
        params.set("order", order);
        params.set("page", "1");

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-500">Sort by:</span>
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger className="w-[160px] bg-white">
                    <SelectValue placeholder="Sort order" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="votes-desc">Most Voted</SelectItem>
                    <SelectItem value="createdAt-desc">Newest</SelectItem>
                    <SelectItem value="createdAt-asc">Oldest</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}