import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/auth';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const tripId = params.id;
    const { cityId, startDate, endDate, order } = await req.json();

    if (!cityId || !startDate || !endDate) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip || trip.userId !== user.userId) {
      return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 403 });
    }

    const stop = await prisma.stop.create({
      data: {
        tripId,
        cityId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        order
      }
    });

    return NextResponse.json(stop, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
