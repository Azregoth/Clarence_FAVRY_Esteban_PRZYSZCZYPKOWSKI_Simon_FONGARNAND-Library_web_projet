import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import type { AuthorModel, UpdateAuthorModel } from '../AuthorModel';

export const useAuthorDetailsProvider = (id: string) => {
  const [author, setAuthor] = useState<AuthorModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadAuthor = (): void => {
    setIsLoading(true);
    axios.get(`http://localhost:3000/authors/${id}`)
      .then(response => setAuthor(response.data))
      .catch(() => message.error("Erreur lors du chargement de l'auteur"))
      .finally(() => setIsLoading(false));
  };

  const updateAuthor = (input: UpdateAuthorModel): void => {
    axios.patch(`http://localhost:3000/authors/${id}`, input)
      .then(() => {
        message.success('Auteur mis à jour');
        loadAuthor();
      })
      .catch(() => message.error('Erreur de mise à jour'));
  };

  return { author, isLoading, loadAuthor, updateAuthor };
};