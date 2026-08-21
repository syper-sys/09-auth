import axios from 'axios';
import { api } from './api';
import type { Note, CreateNewNote } from '@/types/note';
import type { User } from '@/types/user';
import { cookies } from 'next/headers';

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (params: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const { page = 1, perPage = 12, search = '', tag } = params;
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search,
      ...(tag && { tag }),
    },
    
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const fetchNoteById = async (noteId: Note['id']): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await api.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();
  const response = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const response = await api.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

