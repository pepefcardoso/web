import { notFound } from 'next/navigation';

interface FeedbackDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function FeedbackDetailPage({
  params,
}: FeedbackDetailPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Feedback Details</h1>
      <p className="text-gray-700">
        Viewing feedback ID:{' '}
        <span className="font-mono bg-gray-100 p-1 rounded">{id}</span>
      </p>
    </main>
  );
}
