import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Calendar, MapPin, DollarSign, CheckSquare, FileText, Share2 } from 'lucide-react';
import styles from './tripLayout.module.css';

export default async function TripLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const user = await getUser();
  if (!user) redirect('/login');

  const trip = await prisma.trip.findUnique({
    where: { id: params.id },
    include: { stops: true }
  });

  if (!trip || trip.userId !== user.userId) {
    return <div>Trip not found or unauthorized</div>;
  }

  return (
    <div className="animate-fade-in">
      <div 
        className={styles.tripHeader}
        style={{ backgroundImage: `url(${trip.coverPhoto || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80'})` }}
      >
        <div className={styles.overlay}>
          <div className={styles.headerContent}>
            <div className={styles.titleArea}>
              <h1 className={styles.title}>{trip.name}</h1>
              {trip.isPublic && <span className={styles.publicBadge}>Public</span>}
            </div>
            
            <div className={styles.metaData}>
              <span><Calendar size={16} /> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
              <span><MapPin size={16} /> {trip.stops.length} Stops</span>
            </div>
            
            <p className={styles.description}>{trip.description}</p>
          </div>
        </div>
      </div>

      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <Link href={`/trips/${trip.id}/itinerary`} className={styles.tab}>
            <MapPin size={18} /> Itinerary
          </Link>
          <Link href={`/trips/${trip.id}/budget`} className={styles.tab}>
            <DollarSign size={18} /> Budget
          </Link>
          <Link href={`/trips/${trip.id}/checklist`} className={styles.tab}>
            <CheckSquare size={18} /> Checklist
          </Link>
          <Link href={`/trips/${trip.id}/notes`} className={styles.tab}>
            <FileText size={18} /> Notes
          </Link>
          {trip.isPublic && (
            <Link href={`/public/${trip.id}`} className={styles.tab} target="_blank">
              <Share2 size={18} /> Shared View
            </Link>
          )}
        </div>
      </div>

      <div className={styles.contentArea}>
        {children}
      </div>
    </div>
  );
}
