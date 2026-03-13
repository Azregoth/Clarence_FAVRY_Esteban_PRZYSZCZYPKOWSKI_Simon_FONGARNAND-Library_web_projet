import React, { useEffect, useState } from 'react';
import { Table, Popconfirm, Button, Space, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from '@tanstack/react-router';
import { useSalesProvider } from '../providers/useSalesProvider';
import type { SaleModel } from '../SaleModel';

export function SaleList(): React.ReactElement {
  const { sales, isLoading, loadSales, deleteSale } = useSalesProvider();
  
  // Nouvel état pour la recherche
  const [searchText, setSearchText] = useState<string>('');

  useEffect((): void => {
    loadSales();
  }, []);

  // Filtrage des ventes
  const filteredSales = sales.filter(sale =>
    `${sale.client?.firstName} ${sale.client?.lastName} ${sale.book?.title}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<SaleModel> = [
    {
      title: 'Date de la vente',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(), // Tri chronologique
      render: (text: string): string => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Client',
      key: 'client',
      sorter: (a, b) => a.client.lastName.localeCompare(b.client.lastName), // Tri alphabétique sur le nom
      render: (_: unknown, record: SaleModel): React.ReactElement => (
        <Link to="/clients/$clientId" params={{ clientId: record.client.id }}>
          {record.client.firstName} {record.client.lastName}
        </Link>
      ),
    },
    {
      title: 'Livre Acheté',
      key: 'book',
      sorter: (a, b) => a.book.title.localeCompare(b.book.title), // Tri alphabétique sur le titre
      render: (_: unknown, record: SaleModel): React.ReactElement => (
        <Link to="/books/$bookId" params={{ bookId: record.book.id }}>
          {record.book.title}
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
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>Historique des Ventes</h2>
        <Space>
          {/* Barre de recherche */}
          <Input.Search 
            placeholder="Rechercher par client ou livre..." 
            allowClear 
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setSearchText(e.target.value)} 
            style={{ width: 300 }} 
          />
        </Space>
      </div>

      {/* Application des données filtrées */}
      <Table<SaleModel> 
        columns={columns} 
        dataSource={filteredSales} 
        rowKey="id" 
        loading={isLoading} 
      />
    </div>
  );
}