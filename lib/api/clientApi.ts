import axios from 'axios';
import { api } from './api';
import type { Note, CreateNewNote } from '@/types/note';
import type { User } from '@/types/user';

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

export interface UserValues {
  email: string;
  password: string;
}

export interface UpdateMeParams {
  username: string;
}

export const fetchNotes = async (params: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const { page = 1, perPage = 12, search = '', tag } = params;

  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search,
      ...(tag && { tag }),
    },
  });
  return data;
};

export const fetchNoteById = async (noteId: Note['id']): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${noteId}`);
  return data;
};

export const createNewNote = async (payload: CreateNewNote): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', payload);
  return data;
};

export const deleteNote = async (noteId: Note['id']): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${noteId}`);
  return data;
};

export const register = async (userValues: UserValues): Promise<User> => {
  const { data } = await api.post<User>('/auth/register', userValues);
  return data;
};

export const login = async (userValues: UserValues): Promise<User> => {
  const { data } = await api.post<User>('/auth/login', userValues);
  return data;
};

export const checkSession = async (): Promise<User> => {
  const { data } = await api.get<User>('/auth/session');
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  const { data } = await api.post<void>('/auth/logout');
  return data;
};

export const updateMe = async (params: UpdateMeParams): Promise<User> => {
  const { data } = await api.patch('/users/me', params);
  return data;
};
