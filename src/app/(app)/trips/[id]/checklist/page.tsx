import { prisma } from '@/lib/prisma';
import ChecklistClient from './ChecklistClient';

export default async function ChecklistPage({ params }: { params: { id: string } }) {
  const items = await prisma.checklistItem.findMany({
    where: { tripId: params.id },
    orderBy: { category: 'asc' }
  });

  return <ChecklistClient initialItems={items} tripId={params.id} />;
}
