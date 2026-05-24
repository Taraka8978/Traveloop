'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import styles from './profile.module.css';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className={styles.logoutBtn}>
      <LogOut size={18} />
      Sign Out
    </button>
  );
}
