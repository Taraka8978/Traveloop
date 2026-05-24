import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify user exists in database (handles stale sessions after re-seeding)
    const dbUser = await prisma.user.findUnique({ where: { id: user.userId } });
    if (!dbUser) {
      return NextResponse.json({ error: 'Session expired. Please log out and log back in.' }, { status: 401 });
    }

    const { name, description, startDate, endDate, isPublic } = await req.json();

    if (!name || !startDate || !endDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Optional: Auto-assign a random cover photo if not provided
    const defaultPhotos = [
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1000&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1000&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1000&q=80'
    ];
    const coverPhoto = defaultPhotos[Math.floor(Math.random() * defaultPhotos.length)];

    const trip = await prisma.trip.create({
      data: {
        userId: user.userId,
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isPublic,
        coverPhoto
      }
    });

    return NextResponse.json(trip, { status: 201 });
  } catch (error) {
    console.error('Error creating trip:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
