import React, { useEffect } from 'react';
import { Table, Space, Button, Popconfirm } from 'antd';
import { Link } from '@tanstack/react-router';
import type { ColumnsType } from 'antd/es/table';
import { useAuthorsProvider } from '../providers/useAuthorsProvider';
import { CreateAuthorModal } from './CreateAuthorModal';
import type { AuthorModel } from '../AuthorModel';

export function AuthorList(): React.ReactElement {
  const { authors, isLoading, loadAuthors, createAuthor, deleteAuthor } = useAuthorsProvider();

  useEffect((): void => {
    loadAuthors();
  }, []);

  const columns: ColumnsType<AuthorModel> = [
    {
      title: 'Photo',
      key: 'photo',
      render: (_: unknown, record: AuthorModel): React.ReactElement | null =>
        record.photo ? <img src={record.photo} alt="Profil" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} /> : null,
    },
    { title: 'Prénom', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Nom', dataIndex: 'lastName', key: 'lastName' },
    {
      title: 'Livres écrits',
      key: 'books',
      render: (_: unknown, record: AuthorModel): React.ReactElement => (
        <span>{record.books?.length || 0} livre(s)</span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: AuthorModel): React.ReactElement => (
        <Space size="middle">
          <Link to="/authors/$authorId" params={{ authorId: record.id }}>
            <Button type="link">Détails</Button>
          </Link>
          <Popconfirm title="Supprimer cet auteur ?" onConfirm={(): void => deleteAuthor(record.id)} okText="Oui" cancelText="Non">
            <Button type="link" danger>Supprimer</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>Liste des Auteurs</h2>
        <CreateAuthorModal onCreate={createAuthor} />
      </div>
      <Table<AuthorModel> columns={columns} dataSource={authors} rowKey="id" loading={isLoading} />
    </div>
  );
}