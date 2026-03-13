import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import type { AuthorModel, CreateAuthorModel } from '../AuthorModel';

export const useAuthorsProvider = () => {
  const [authors, setAuthors] = useState<AuthorModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadAuthors = (): void => {
    setIsLoading(true);
    axios.get('http://localhost:3000/authors')
      .then(response => setAuthors(response.data))
      .catch(() => message.error('Erreur lors du chargement des auteurs'))
      .finally(() => setIsLoading(false));
  };

  const createAuthor = (input: CreateAuthorModel): void => {
    axios.post('http://localhost:3000/authors', input)
      .then(() => {
        message.success('Auteur créé avec succès');
        loadAuthors();
      })
      .catch(() => message.error('Erreur lors de la création'));
  };

  const deleteAuthor = (id: string): void => {
    axios.delete(`http://localhost:3000/authors/${id}`)
      .then(() => {
        message.success('Auteur supprimé');
        loadAuthors();
      })
      .catch(() => message.error('Erreur lors de la suppression'));
  };

  return { authors, isLoading, loadAuthors, createAuthor, deleteAuthor };
};