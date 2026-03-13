export type BookModel = {
  id: string
  title: string
  yearPublished: number
  photo?: string // Ajout de la photo
  author: {
    id: string
    firstName: string
    lastName: string
  }
  sales?: { // Ajout des ventes
    id: string
    date: string
    client: {
      id: string
      firstName: string
      lastName: string
    }
  }[]
}

export type CreateBookModel = {
  authorId: string
  title: string
  yearPublished: number
  photo?: string // Optionnel
}

export type UpdateBookModel = Partial<CreateBookModel>