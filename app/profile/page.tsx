import { apiClient } from "@/lib/api-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

export default async function ProfilePage() {
    let user: User | null = null;

    try {
        const res = await apiClient<{ user: User }>("/users/me", { skipRedirect: true });
        user = res.user;
    } catch (error) {
        console.error("Error fetching user data:", error);
    }

    if (!user) {
        redirect("/login");
    }

    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    return (
        <main className="container max-w-2xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold tracking-tight mb-8">User Profile</h1>

            <Card className="p-4 sm:p-8">
                <CardHeader className="flex flex-row items-center gap-6 pb-6 border-b px-0 pt-0">
                    <Avatar className="h-20 w-20">
                        <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <CardTitle className="text-2xl">{user.name}</CardTitle>
                        <div className="text-muted-foreground">{user.email}</div>
                        <div className="pt-2">
                            <Badge variant="secondary" className="capitalize">
                                {user.role.toLowerCase()}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="px-0 pt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <span className="text-sm font-medium text-muted-foreground">User ID</span>
                            <p className="text-sm font-mono bg-muted p-2 rounded-md truncate">
                                {user.id}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-sm font-medium text-muted-foreground">Account Status</span>
                            <p className="text-sm">Active</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}