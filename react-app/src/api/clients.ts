import type { Client, CreateClientDto } from '../types/client';

const API_URL = 'http://localhost:3000/clients';

export const getClients = async (): Promise<Client[]> => {
  const response: Response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch clients');
  return response.json();
};

export const getClient = async (id: string): Promise<Client> => {
  const response: Response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Failed to fetch client');
  return response.json();
};

export const createClient = async (data: CreateClientDto): Promise<Client> => {
  const response: Response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create client');
  return response.json();
};

export const updateClient = async (id: string, data: Partial<CreateClientDto>): Promise<Client> => {
  const response: Response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update client');
  return response.json();
};

export const deleteClient = async (id: string): Promise<void> => {
  const response: Response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete client');
};