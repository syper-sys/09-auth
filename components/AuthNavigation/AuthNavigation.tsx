'use client'

import css from '@/components/AuthNavigation/AuthNavigation.module.css';
import Link from 'next/link';
import { useDraftStore } from '@/lib/store/userStore';
import {useRouter} from 'next/navigation';
import { logout } from '@/lib/api/clientApi';

function AuthNavigation() {
  const router = useRouter();
  const { draft, isAuthenticated, setIsAuthenticated, resetDraft } = useDraftStore();

  const handleLogout = async () => {
    try {
      await logout();
      resetDraft();
      setIsAuthenticated(false);
      router.push('/sign-in');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return isAuthenticated ? (
    <>
      <li className={css.navigationItem}>
        <p className={css.userEmail}>{draft?.email}</p>
        <button onClick={handleLogout} className={css.logoutButton}>Logout</button>
      </li>

      <li className={css.navigationItem}>
        <Link href="/profile" className={css.navigationLink}>
          Profile
        </Link>
      </li>
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" className={css.navigationLink}>
          Login
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link href="/sign-up" className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
}

export default AuthNavigation;
