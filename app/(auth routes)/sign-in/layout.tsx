import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Sign in | NoteHub`,
  description: `Make your own account and be able to create, change and delete your notes with NoteHub`,
  openGraph: {
    title: `Sign in`,
    description: `Make your own account and be able to create, change and delete your notes`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: `Make your own account and be able to create, change and delete your notes`,
      },
    ],
    url: `https://08-zustand-blush-theta.vercel.app/`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
