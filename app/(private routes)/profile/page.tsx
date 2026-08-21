import css from '@/app/(private routes)/profile/page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getMe } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'Profile | NoteHub',
  description: 'In profile you can change your nickname, email and even avatar!',
  openGraph: {
    title: 'Profile | NoteHub',
    description: 'In profile you can change your nickname, email and even avatar!',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Profile | NoteHub',
      },
    ],
    url: `https://08-zustand-blush-theta.vercel.app`,
  },
};

async function Profile() {
  const data = await getMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={data.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {data.username}</p>
          <p>Email: {data.email}</p>
        </div>
      </div>
    </main>
  );
}

export default Profile;
