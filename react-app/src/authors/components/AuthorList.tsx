import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Popconfirm, Input } from 'antd'; // Ajout de Input
import { Link } from '@tanstack/react-router';
import type { ColumnsType } from 'antd/es/table';
import { useAuthorsProvider } from '../providers/useAuthorsProvider';
import { CreateAuthorModal } from './CreateAuthorModal';
import type { AuthorModel } from '../AuthorModel';

export function AuthorList(): React.ReactElement {
  const { authors, isLoading, loadAuthors, createAuthor, deleteAuthor } = useAuthorsProvider();
  const [searchText, setSearchText] = useState<string>(''); // Nouvel état

  useEffect((): void => {
    loadAuthors();
  }, []);

  // Filtrage des données
  const filteredAuthors = authors.filter(author =>
    `${author.firstName} ${author.lastName}`.toLowerCase().includes(searchText.toLowerCase())
  );

  // Ajout des "sorter" dans les colonnes
  const columns: ColumnsType<AuthorModel> = [
    {
      title: 'Photo',
      key: 'photo',
      render: (_: unknown, record: AuthorModel): React.ReactElement | null =>
        record.photo ? <img src={record.photo} alt="Profil" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} /> : null,
    },
    { 
      title: 'Prénom', 
      dataIndex: 'firstName', 
      key: 'firstName',
      sorter: (a, b) => a.firstName.localeCompare(b.firstName) // Tri alphabétique
    },
    { 
      title: 'Nom', 
      dataIndex: 'lastName', 
      key: 'lastName',
      sorter: (a, b) => a.lastName.localeCompare(b.lastName) // Tri alphabétique
    },
    {
      title: 'Livres écrits',
      key: 'books',
      sorter: (a, b) => (a.books?.length || 0) - (b.books?.length || 0), // Tri numérique
      render: (_: unknown, record: AuthorModel): React.ReactElement => (
        <span>{record.books?.length || 0} livre(s)</span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: AuthorModel): React.ReactElement => (
        <Space size="middle">
          <Link to="/authors/$authorId" params={{ authorId: record.id }}><Button type="link">Détails</Button></Link>
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
        <Space>
          {/* La barre de recherche */}
          <Input.Search 
            placeholder="Rechercher un auteur..." 
            allowClear 
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setSearchText(e.target.value)} 
            style={{ width: 250 }} 
          />
          <CreateAuthorModal onCreate={createAuthor} />
        </Space>
      </div>
      {/* On passe "filteredAuthors" au lieu de "authors" */}
      <Table<AuthorModel> columns={columns} dataSource={filteredAuthors} rowKey="id" loading={isLoading} />
    </div>
  );
}