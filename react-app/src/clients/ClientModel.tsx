export type ClientModel = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  photo?: string;
  sales?: {
    id: string;
    date: string;
    book: {
      id: string;
      title: string;
      yearPublished: number;
    };
  }[];
};

export type CreateClientModel = {
  firstName: string;
  lastName: string;
  email?: string;
  photo?: string;
};

export type UpdateClientModel = Partial<CreateClientModel>;