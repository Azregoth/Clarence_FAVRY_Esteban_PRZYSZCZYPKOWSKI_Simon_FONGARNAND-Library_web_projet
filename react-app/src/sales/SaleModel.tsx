export type SaleModel = {
  id: string;
  date: string;
  client: {
    id: string;
    firstName: string;
    lastName: string;
  };
  book: {
    id: string;
    title: string;
  };
};