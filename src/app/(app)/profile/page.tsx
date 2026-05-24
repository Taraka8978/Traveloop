import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Calendar, MapPin, DollarSign, Briefcase } from 'lucide-react';
import styles from './profile.module.css';
import LogoutButton from './LogoutButton';

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) redirect('/login');

  // Fetch all user trips and nested stops/expenses to compute stats
  const trips = await prisma.trip.findMany({
    where: { userId: user.userId },
    include: {
      stops: true,
      expenses: true,
    }
  });

  const tripsCount = trips.length;

  const cityIds = new Set<string>();
  trips.forEach(trip => {
    trip.stops.forEach(stop => {
      cityIds.add(stop.cityId);
    });
  });
  const uniqueCitiesCount = cityIds.size;

  const totalExpenses = trips.reduce((sum, trip) => {
    return sum + trip.expenses.reduce((s, exp) => s + exp.amount, 0);
  }, 0);

  // Get user initials for avatar
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`${styles.container} animate-fade-in`}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Profile</h1>
        <p className={styles.subtitle}>Manage your account and view your travel statistics</p>
      </header>

      <div className={`glass ${styles.profileCard}`}>
        <div className={styles.avatar}>
          {initials || 'TR'}
        </div>

        <div>
          <h2 className={styles.userName}>{user.name}</h2>
          <p className={styles.userEmail}>{user.email}</p>
        </div>

        <div className={styles.statsRow}>
          <div className={`glass ${styles.statCard}`}>
            <div className={styles.statValue}>{tripsCount}</div>
            <div className={styles.statLabel}>Trips Planned</div>
          </div>
          
          <div className={`glass ${styles.statCard}`}>
            <div className={styles.statValue}>{uniqueCitiesCount}</div>
            <div className={styles.statLabel}>Cities Visited</div>
          </div>

          <div className={`glass ${styles.statCard}`}>
            <div className={styles.statValue}>${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <div className={styles.statLabel}>Total Budget</div>
          </div>
        </div>

        <div className={styles.actions}>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
