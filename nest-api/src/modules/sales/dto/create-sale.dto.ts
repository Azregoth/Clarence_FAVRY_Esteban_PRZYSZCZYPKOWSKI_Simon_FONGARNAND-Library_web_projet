import { type ClientId } from '../../clients/entities/client.entity';
import { type BookId } from '../../books/entities/book.entity';

export class CreateSaleDto {
  date: Date;
  clientId: ClientId;
  bookId: BookId;
}