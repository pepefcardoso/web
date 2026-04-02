export default function AboutPage() {
    return (
        <main className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight mb-8">About Feedback Hub</h1>
            <div className="prose prose-slate max-w-none text-muted-foreground space-y-6">
                <p className="text-lg leading-relaxed">
                    Feedback Hub is an open platform designed to capture, organize, and prioritize user ideas and feature requests.
                </p>
                <p>
                    We believe that the best products are built in collaboration with their users. This platform provides a transparent way for you to suggest improvements, report issues, and vote on the features you want to see built next.
                </p>
                <div className="bg-muted p-6 rounded-xl border border-border/50 mt-8">
                    <h2 className="text-xl font-semibold text-foreground mb-4">How it works</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Suggest:</strong> Submit your ideas for new features or improvements.</li>
                        <li><strong>Vote:</strong> Browse existing suggestions and upvote the ones you find most valuable.</li>
                        <li><strong>Track:</strong> Follow the progress of ideas as they move from Planned to In Progress and finally Completed on our Roadmap.</li>
                    </ul>
                </div>
            </div>
        </main>
    );
}