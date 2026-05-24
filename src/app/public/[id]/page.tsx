import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Calendar, MapPin, Activity, Clock } from 'lucide-react';
import styles from './public.module.css';

export default async function PublicItinerary({ params }: { params: Promise<{ id: string }> }) {
  const trip = await prisma.trip.findUnique({
    where: { id: (await params).id },
    include: {
      user: {
        select: { name: true }
      },
      stops: {
        orderBy: { order: 'asc' },
        include: {
          city: true,
          activities: { orderBy: { date: 'asc' } }
        }
      }
    }
  });

  if (!trip || !trip.isPublic) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <header 
        className={styles.header}
        style={{ backgroundImage: `url(${trip.coverPhoto || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80'})` }}
      >
        <div className={styles.overlay}>
          <div className={styles.headerContent}>
            <span className={styles.authorBadge}>Curated by {trip.user.name}</span>
            <h1 className={styles.title}>{trip.name}</h1>
            <div className={styles.metaData}>
              <span><Calendar size={16} /> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
              <span><MapPin size={16} /> {trip.stops.length} Stops</span>
            </div>
            <p className={styles.description}>{trip.description}</p>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.timeline}>
          {trip.stops.map((stop, index) => (
            <div key={stop.id} className={styles.timelineItem}>
              <div className={styles.timelineMarker}>
                <div className={styles.markerDot} />
                {index < trip.stops.length - 1 && <div className={styles.markerLine} />}
              </div>
              
              <div className={`glass ${styles.stopCard}`}>
                <div className={styles.stopHeader}>
                  <MapPin className={styles.stopIcon} />
                  <div>
                    <h3>{stop.city.name}, {stop.city.country}</h3>
                    <span className={styles.stopDates}>
                      {new Date(stop.startDate).toLocaleDateString()} - {new Date(stop.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {stop.activities.length > 0 && (
                  <div className={styles.activitiesList}>
                    {stop.activities.map((activity) => (
                      <div key={activity.id} className={styles.activityItem}>
                        <Activity size={16} className={styles.activityIcon} />
                        <div className={styles.activityDetails}>
                          <h4>{activity.name}</h4>
                          <p>{activity.description}</p>
                        </div>
                        {activity.duration && (
                          <div className={styles.activityMeta}>
                            <Clock size={14} /> {activity.duration}m
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {trip.stops.length === 0 && (
            <p className={styles.emptyState}>This itinerary doesn't have any stops yet.</p>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Created with Traveloop. <a href="/">Plan your own trip</a></p>
      </footer>
    </div>
  );
}
