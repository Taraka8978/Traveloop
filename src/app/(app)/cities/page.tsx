import { prisma } from '@/lib/prisma';
import ExploreCitiesClient from './ExploreCitiesClient';

export default async function CitiesPage() {
  const cities = await prisma.city.findMany({
    orderBy: { popularity: 'desc' }
  });

  return <ExploreCitiesClient initialCities={cities} />;
}
