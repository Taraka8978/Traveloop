'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Plane, LogOut, User as UserIcon } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/dashboard" className={styles.logo}>
          <Plane className={styles.logoIcon} />
          <span className={styles.logoText}>Traveloop</span>
        </Link>
        
        <div className={styles.navLinks}>
          <Link 
            href="/dashboard" 
            className={`${styles.navLink} ${pathname === '/dashboard' ? styles.active : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            href="/trips" 
            className={`${styles.navLink} ${pathname.startsWith('/trips') ? styles.active : ''}`}
          >
            My Trips
          </Link>
          <Link 
            href="/cities" 
            className={`${styles.navLink} ${pathname.startsWith('/cities') ? styles.active : ''}`}
          >
            Explore Cities
          </Link>
        </div>

        <div className={styles.navActions}>
          <Link 
            href="/profile" 
            className={`${styles.iconButton} ${pathname === '/profile' ? styles.active : ''}`} 
            title="Profile"
          >
            <UserIcon size={20} />
          </Link>
          <button onClick={handleLogout} className={styles.iconButton} title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
