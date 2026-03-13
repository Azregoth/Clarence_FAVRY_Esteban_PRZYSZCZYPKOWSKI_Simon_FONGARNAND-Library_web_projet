import type { Book, UpdateBookDto } from '../types/book';

const API_URL = 'http://localhost:3000/books';

export const getBooks = async (): Promise<Book[]> => {
  const response: Response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch books');
  return response.json();
};

export const getBook = async (id: string): Promise<Book> => {
  const response: Response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Failed to fetch book');
  return response.json();
};

export const updateBook = async (id: string, data: Partial<UpdateBookDto>): Promise<Book> => {
  const response: Response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update book');
  return response.json();
};

export const deleteBook = async (id: string): Promise<void> => {
  const response: Response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete book');
};