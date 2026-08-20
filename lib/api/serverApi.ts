import axios from 'axios';
import { api } from './api';
import type { Note, CreateNewNote } from '@/types/note';

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
