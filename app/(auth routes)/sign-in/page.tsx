'use client';

import css from '@/app/(auth routes)/sign-in/page.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api/clientApi';
import type { UserValues } from '@/lib/api/clientApi';
import { ApiError } from '@/app/api/api';
import { useAuthStore } from '@/lib/store/authStore';

function SignIn() {
  const { setUser, setIsAuthenticated } = useAuthStore();
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues: UserValues = {
        email: String(formData.get('email')),
        password: String(formData.get('password')),
      };

      const res = await login(formValues);

      if (res) {
        setUser(res);
        setIsAuthenticated(true);
        router.push('/profile');
      } else {
        setIsAuthenticated(false);
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error'
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}

export default SignIn;
