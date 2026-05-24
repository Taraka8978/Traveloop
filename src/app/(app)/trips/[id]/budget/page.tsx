import { prisma } from '@/lib/prisma';
import BudgetClient from './BudgetClient';

export default async function BudgetPage({ params }: { params: Promise<{ id: string }> }) {
  const tripId = (await params).id;
  
  const expenses = await prisma.expense.findMany({
    where: { tripId },
    orderBy: { date: 'desc' }
  });

  return <BudgetClient initialExpenses={expenses} tripId={tripId} />;
}
