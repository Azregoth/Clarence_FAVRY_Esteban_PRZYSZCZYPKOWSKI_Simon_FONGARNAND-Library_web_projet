import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import type { ClientModel, UpdateClientModel } from '../ClientModel';

export const useClientDetailsProvider = (id: string) => {
  const [client, setClient] = useState<ClientModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadClient = (): void => {
    setIsLoading(true);
    axios.get(`http://localhost:3000/clients/${id}`)
      .then(response => setClient(response.data))
      .catch(() => message.error("Erreur lors du chargement du client"))
      .finally(() => setIsLoading(false));
  };

  const updateClient = (input: UpdateClientModel): void => {
    axios.patch(`http://localhost:3000/clients/${id}`, input)
      .then(() => {
        message.success('Client mis à jour');
        loadClient();
      })
      .catch(() => message.error('Erreur de mise à jour'));
  };

  return { client, isLoading, loadClient, updateClient };
};