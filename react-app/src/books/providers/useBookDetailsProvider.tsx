import { useState } from 'react'
import type { BookModel, UpdateBookModel } from '../BookModel'
import axios from 'axios'
import { message } from 'antd'

export const useBookDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [book, setBook] = useState<BookModel | null>(null)

  const loadBook = (): void => {
    setIsLoading(true)
    axios.get(`http://localhost:3000/books/${id}`)
      .then(response => setBook(response.data))
      .catch(() => message.error('Erreur lors du chargement du livre'))
      .finally(() => setIsLoading(false))
  }

  const updateBook = (input: UpdateBookModel): void => {
    axios.patch(`http://localhost:3000/books/${id}`, input)
      .then(() => {
        message.success('Livre mis à jour !')
        loadBook()
      })
      .catch(() => message.error('Erreur lors de la mise à jour'))
  }

  const recordSale = (clientId: string, date: Date): Promise<void> => {
    return axios.post('http://localhost:3000/sales', {
      bookId: id,
      clientId,
      date
    })
    .then(() => {
      message.success('Achat enregistré avec succès !')
      loadBook() // On recharge le livre pour voir le nouvel acheteur
    })
    .catch(() => {
      message.error("Erreur lors de l'enregistrement de l'achat")
      throw new Error("Erreur")
    })
  }

  return { isLoading, book, loadBook, updateBook, recordSale }
}