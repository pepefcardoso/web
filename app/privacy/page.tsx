export default function PrivacyPage() {
    return (
        <main className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Privacy Policy</h1>
            <div className="prose prose-slate max-w-none text-muted-foreground space-y-6">
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
                <p>When you register for an account, we collect your name and email address. We also collect the content of the feedback and comments you submit to the platform.</p>

                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
                <p>Your information is used solely to manage your account, attribute your feedback and votes, and communicate platform updates. We do not sell your personal data to third parties.</p>

                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Data Security</h2>
                <p>We implement standard security measures to protect your data. Authentication tokens are stored securely in HttpOnly cookies to prevent unauthorized access.</p>

                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Contact Us</h2>
                <p>If you have any questions about this privacy policy, please contact the repository maintainers via GitHub.</p>
            </div>
        </main>
    );
}