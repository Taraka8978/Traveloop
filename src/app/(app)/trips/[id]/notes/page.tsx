import { prisma } from '@/lib/prisma';
import NotesClient from './NotesClient';

export default async function NotesPage({ params }: { params: Promise<{ id: string }> }) {
  const notes = await prisma.note.findMany({
    where: { tripId: (await params).id },
    orderBy: { timestamp: 'desc' }
  });

  return <NotesClient initialNotes={notes} tripId={(await params).id} />;
}
