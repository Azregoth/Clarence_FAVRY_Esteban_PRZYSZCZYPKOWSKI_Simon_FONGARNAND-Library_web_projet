export type ClientId = string & { __brand: 'Client' };

export interface SaleBook {
  id: string;
  title: string;
  yearPublished: number;
}

export interface ClientSale {
  id: string;
  date: string;
  book: SaleBook;
}

export interface Client {
  id: ClientId;
  firstName: string;
  lastName: string;
  email?: string;
  photo?: string;
  sales?: ClientSale[];
}

export interface CreateClientDto {
  firstName: string;
  lastName: string;
  email?: string;
  photo?: string;
}