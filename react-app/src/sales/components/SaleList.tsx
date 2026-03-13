import React, { useEffect } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from '@tanstack/react-router';
import { useSalesProvider } from '../providers/useSalesProvider';
import type { SaleModel } from '../SaleModel';

export function SaleList(): React.ReactElement {
  const { sales, isLoading, loadSales, deleteSale } = useSalesProvider();

  useEffect((): void => {
    loadSales();
  }, []);

  const columns: ColumnsType<SaleModel> = [
    {
      title: 'Date d\'achat',
      key: 'date',
      render: (_: unknown, record: SaleModel): React.ReactElement => (
        <span>{new Date(record.date).toLocaleDateString()}</span>
      ),
    },
    {
      title: 'Client',
      key: 'client',
      render: (_: unknown, record: SaleModel): React.ReactElement => (
        <Link to="/clients/$clientId" params={{ clientId: record.client?.id }}>
          {record.client?.firstName} {record.client?.lastName}
        </Link>
      ),
    },
    {
      title: 'Livre acheté',
      key: 'book',
      render: (_: unknown, record: SaleModel): React.ReactElement => (
        <Link to="/books/$bookId" params={{ bookId: record.book?.id }}>
          {record.book?.title}
        </Link>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: SaleModel): React.ReactElement => (
        <Popconfirm 
          title="Annuler cette vente ?" 
          onConfirm={(): void => deleteSale(record.id)} 
          okText="Oui" 
          cancelText="Non"
        >
          <Button type="link" danger>Annuler l'achat</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h2>Historique des Ventes</h2>
      </div>
      <Table<SaleModel> 
        columns={columns} 
        dataSource={sales} 
        rowKey="id" 
        loading={isLoading} 
      />
    </div>
  );
}