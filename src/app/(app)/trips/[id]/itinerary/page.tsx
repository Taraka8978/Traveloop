import { prisma } from '@/lib/prisma';
import ItineraryBuilder from './ItineraryBuilder';

export default async function ItineraryPage({ params }: { params: { id: string } }) {
  const trip = await prisma.trip.findUnique({
    where: { id: params.id },
    include: {
      stops: {
        orderBy: { order: 'asc' },
        include: {
          city: true,
          activities: {
            orderBy: { date: 'asc' }
          }
        }
      }
    }
  });

  const allCities = await prisma.city.findMany({
    orderBy: { popularity: 'desc' }
  });

  if (!trip) return null;

  return (
    <ItineraryBuilder initialStops={trip.stops} tripId={trip.id} allCities={allCities} />
  );
}
