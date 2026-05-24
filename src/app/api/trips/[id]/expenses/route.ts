import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/auth';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const tripId = (await params).id;
    const { category, description, amount, date } = await req.json();

    if (!category || !description || amount === undefined || !date) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip || trip.userId !== user.userId) {
      return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 403 });
    }

    const expense = await prisma.expense.create({
      data: {
        tripId,
        category,
        description,
        amount: parseFloat(amount),
        date: new Date(date)
      }
    });

    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    console.error('Error creating expense:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
