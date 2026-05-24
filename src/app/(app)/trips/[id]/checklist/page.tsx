import { prisma } from '@/lib/prisma';
import ChecklistClient from './ChecklistClient';

export default async function ChecklistPage({ params }: { params: Promise<{ id: string }> }) {
  const items = await prisma.checklistItem.findMany({
    where: { tripId: (await params).id },
    orderBy: { category: 'asc' }
  });

  return <ChecklistClient initialItems={items} tripId={(await params).id} />;
}
