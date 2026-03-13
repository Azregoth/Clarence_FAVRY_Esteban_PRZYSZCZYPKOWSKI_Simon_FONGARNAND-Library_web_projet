import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import type { SaleModel } from '../SaleModel';

export const useSalesProvider = () => {
  const [sales, setSales] = useState<SaleModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadSales = (): void => {
    setIsLoading(true);
    axios.get('http://localhost:3000/sales')
      .then(response => setSales(response.data))
      .catch(() => message.error('Erreur lors du chargement des ventes'))
      .finally(() => setIsLoading(false));
  };

  const deleteSale = (id: string): void => {
    axios.delete(`http://localhost:3000/sales/${id}`)
      .then(() => {
        message.success('Vente annulée avec succès');
        loadSales();
      })
      .catch(() => message.error('Erreur lors de la suppression de la vente'));
  };

  return { sales, isLoading, loadSales, deleteSale };
};