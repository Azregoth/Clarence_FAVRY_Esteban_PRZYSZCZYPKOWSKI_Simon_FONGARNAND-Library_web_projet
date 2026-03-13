import type { Client } from './client';

export type BookId = string & { __brand: 'Book' };

export interface BookSale {
  id: string;
  date: string;
  client: Client;
}

export interface Book {
  id: BookId;
  title: string;
  yearPublished: number;
  photo?: string;
  sales?: BookSale[];
}

export interface UpdateBookDto {
  title?: string;
  yearPublished?: number;
  photo?: string;
}