import { prisma } from '@/lib/prisma';
import NotesClient from './NotesClient';

export default async function NotesPage({ params }: { params: { id: string } }) {
  const notes = await prisma.note.findMany({
    where: { tripId: params.id },
    orderBy: { timestamp: 'desc' }
  });

  return <NotesClient initialNotes={notes} tripId={params.id} />;
}
