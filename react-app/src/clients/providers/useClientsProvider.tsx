import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import type { ClientModel, CreateClientModel } from '../ClientModel';

export const useClientsProvider = () => {
  const [clients, setClients] = useState<ClientModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadClients = (): void => {
    setIsLoading(true);
    axios.get('http://localhost:3000/clients')
      .then(response => setClients(response.data))
      .catch(() => message.error('Erreur lors du chargement des clients'))
      .finally(() => setIsLoading(false));
  };

  const createClient = (input: CreateClientModel): Promise<void> => {
    return axios.post('http://localhost:3000/clients', input)
      .then(() => {
        message.success('Client créé avec succès');
        loadClients();
      })
      .catch(() => {
        message.error('Erreur lors de la création');
        throw new Error('Creation failed');
      });
  };

  const deleteClient = (id: string): void => {
    axios.delete(`http://localhost:3000/clients/${id}`)
      .then(() => {
        message.success('Client supprimé avec succès');
        loadClients();
      })
      .catch(() => message.error('Erreur lors de la suppression'));
  };

  return { clients, isLoading, loadClients, createClient, deleteClient };
};