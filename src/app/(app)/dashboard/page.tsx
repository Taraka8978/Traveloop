import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/auth';
import Link from 'next/link';
import { Plus, MapPin, Calendar } from 'lucide-react';
import styles from './dashboard.module.css';

export default async function Dashboard() {
  const user = await getUser();
  
  if (!user) return null; // handled by middleware

  const upcomingTrips = await prisma.trip.findMany({
    where: { 
      userId: user.userId,
      startDate: { gte: new Date() }
    },
    orderBy: { startDate: 'asc' },
    take: 3,
    include: {
      stops: {
        include: { city: true }
      }
    }
  });

  const popularCities = await prisma.city.findMany({
    orderBy: { popularity: 'desc' },
    take: 4,
  });

  return (
    <div className="animate-fade-in">
      <header className={styles.header}>
        <div>
          <h1 className={styles.greeting}>Welcome back, {user.name.split(' ')[0]}!</h1>
          <p className={styles.subtitle}>Ready for your next adventure?</p>
        </div>
        <Link href="/trips/create" className="btn-primary">
          <Plus size={20} />
          Plan New Trip
        </Link>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Upcoming Trips</h2>
          <Link href="/trips" className={styles.viewAll}>View all</Link>
        </div>

        {upcomingTrips.length === 0 ? (
          <div className={`glass ${styles.emptyState}`}>
            <MapPin size={48} className={styles.emptyIcon} />
            <h3>No upcoming trips</h3>
            <p>You don't have any trips planned yet. Start dreaming!</p>
            <Link href="/trips/create" className="btn-primary" style={{ marginTop: '1rem' }}>
              Create your first trip
            </Link>
          </div>
        ) : (
          <div className={styles.tripGrid}>
            {upcomingTrips.map((trip) => (
              <Link href={`/trips/${trip.id}/itinerary`} key={trip.id} className={styles.tripCard}>
                <div 
                  className={styles.tripImage} 
                  style={{ backgroundImage: `url(${trip.coverPhoto || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80'})` }}
                >
                  <div className={styles.tripImageOverlay}>
                    <h3 className={styles.tripName}>{trip.name}</h3>
                    <span className={styles.tripDates}>
                      <Calendar size={14} />
                      {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className={styles.tripDetails}>
                  <p className={styles.tripDestinations}>
                    {trip.stops.length} destinations
                  </p>
                  <div className={styles.cityTags}>
                    {trip.stops.slice(0, 3).map((stop) => (
                      <span key={stop.id} className={styles.cityTag}>{stop.city.name}</span>
                    ))}
                    {trip.stops.length > 3 && <span className={styles.cityTag}>+{trip.stops.length - 3}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Popular Destinations</h2>
          <Link href="/cities" className={styles.viewAll}>Explore more</Link>
        </div>

        <div className={styles.cityGrid}>
          {popularCities.map((city) => (
            <div key={city.id} className={styles.cityCard}>
              <div 
                className={styles.cityImage}
                style={{ backgroundImage: `url(${city.image || 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80'})` }}
              />
              <div className={styles.cityContent}>
                <h4>{city.name}</h4>
                <p>{city.country}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
