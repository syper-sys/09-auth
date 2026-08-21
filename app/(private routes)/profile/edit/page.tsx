'use client'

import css from '@/app/(private routes)/profile/edit/page.module.css';
import { useDraftStore } from '@/lib/store/authStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { updateMe } from '@/lib/api/clientApi';

function ProfileEditor() {
  const router = useRouter();
  const { user, setUser } = useDraftStore();

  // Локальний стан для поля редагування
  const [username, setUsername] = useState(user?.username || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updateUser = await updateMe({ username });

      if (user) {
        setUser({ ...user, username });
      }
      router.push('/profile');
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || 'https://ac.goit.global/fullstack/react/default-avatar.jpg'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form onSubmit={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className={css.input}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" onClick={() => router.push("/profile")} className={css.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default ProfileEditor;
