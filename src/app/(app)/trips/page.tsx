import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/auth';
import Link from 'next/link';
import { Plus, Calendar, MapPin } from 'lucide-react';
import styles from './trips.module.css';

export default async function TripsPage() {
  const user = await getUser();
  
  if (!user) return null;

  const trips = await prisma.trip.findMany({
    where: { userId: user.userId },
    orderBy: { startDate: 'desc' },
    include: {
      stops: { include: { city: true } }
    }
  });

  const upcomingTrips = trips.filter(t => new Date(t.endDate) >= new Date());
  const pastTrips = trips.filter(t => new Date(t.endDate) < new Date());

  return (
    <div className="animate-fade-in">
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>My Trips</h1>
          <p className={styles.subtitle}>Manage all your travel plans</p>
        </div>
        <Link href="/trips/create" className="btn-primary">
          <Plus size={20} />
          Create Trip
        </Link>
      </header>

      {trips.length === 0 ? (
        <div className={`glass ${styles.emptyState}`}>
          <MapPin size={48} className={styles.emptyIcon} />
          <h3>No trips yet</h3>
          <p>You haven't created any trips. Time to plan an adventure!</p>
          <Link href="/trips/create" className="btn-primary" style={{ marginTop: '1rem' }}>
            Start Planning
          </Link>
        </div>
      ) : (
        <>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Upcoming Trips</h2>
            <div className={styles.tripGrid}>
              {upcomingTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
              {upcomingTrips.length === 0 && <p className={styles.emptyText}>No upcoming trips.</p>}
            </div>
          </section>

          {pastTrips.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Past Trips</h2>
              <div className={styles.tripGrid}>
                {pastTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

function TripCard({ trip }: { trip: any }) {
  return (
    <Link href={`/trips/${trip.id}/itinerary`} className={styles.tripCard}>
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
          {trip.stops.map((stop: any) => (
            <span key={stop.id} className={styles.cityTag}>{stop.city.name}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
