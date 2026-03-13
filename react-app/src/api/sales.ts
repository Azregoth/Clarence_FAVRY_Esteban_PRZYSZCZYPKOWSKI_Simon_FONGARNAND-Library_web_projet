import type { CreateSaleDto } from '../types/sale';

const API_URL = 'http://localhost:3000/sales';

export const createSale = async (data: CreateSaleDto): Promise<void> => {
  const response: Response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create sale');
};