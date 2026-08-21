'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useDraftStore } from '@/lib/store/userStore';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useDraftStore((state) => state.setUser);
  const resetDraft = useDraftStore((state) => state.resetDraft);
  const setIsAuthenticated = useDraftStore((state) => state.setIsAuthenticated);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const isAuthenticated = await checkSession();

        if (isAuthenticated) {
          const user = await getMe();
          if (user) {
            setUser(user);
            setIsAuthenticated(true);
          }
        } else {
          resetDraft();
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Failed to authenticate:', error);
        resetDraft();
        setIsAuthenticated(false);
      }
    };

    fetchUser();
  }, [setUser, resetDraft, setIsAuthenticated]);

  return <>{children}</>;
};

export default AuthProvider;