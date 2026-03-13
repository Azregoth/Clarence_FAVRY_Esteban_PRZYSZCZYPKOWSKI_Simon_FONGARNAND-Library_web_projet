export type AuthorModel = {
  id: string;
  firstName: string;
  lastName: string;
  photo?: string;
  books?: {
    id: string;
    title: string;
    yearPublished: number;
    sales?: { id: string }[];
  }[];
};

export type CreateAuthorModel = {
  firstName: string;
  lastName: string;
  photo?: string;
};

export type UpdateAuthorModel = Partial<CreateAuthorModel>;