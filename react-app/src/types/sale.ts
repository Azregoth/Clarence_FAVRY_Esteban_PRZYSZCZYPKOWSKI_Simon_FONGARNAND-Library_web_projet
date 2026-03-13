import type { ClientId } from './client';
import type { BookId } from './book';

export interface CreateSaleDto {
  date: Date | string;
  clientId: ClientId;
  bookId: BookId;
}