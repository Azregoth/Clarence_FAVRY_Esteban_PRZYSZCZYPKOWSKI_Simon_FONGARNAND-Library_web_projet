import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Popconfirm, Modal, Form, Input } from 'antd';
import { Link } from '@tanstack/react-router';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
import { useClientsProvider } from '../providers/useClientsProvider';
import type { ClientModel, CreateClientModel } from '../ClientModel';

export function ClientList(): React.ReactElement {
  const { clients, isLoading, loadClients, createClient, deleteClient } = useClientsProvider();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm<CreateClientModel>();
  
  // Nouvel état pour la barre de recherche
  const [searchText, setSearchText] = useState<string>('');

  useEffect((): void => {
    loadClients();
  }, []);

  const handleCreate = async (values: CreateClientModel): Promise<void> => {
    try {
      await createClient(values);
      setIsModalOpen(false);
      form.resetFields();
    } catch (e) {
      // Erreur gérée dans le provider
    }
  };

  // Filtrage des clients en fonction de la barre de recherche
  const filteredClients = clients.filter(client =>
    `${client.firstName} ${client.lastName} ${client.email || ''}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<ClientModel> = [
    {
      title: 'Photo',
      key: 'photo',
      render: (_: unknown, record: ClientModel): React.ReactElement | null =>
        record.photo ? <img src={record.photo} alt="Profil" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} /> : null,
    },
    { 
      title: 'Prénom', 
      dataIndex: 'firstName', 
      key: 'firstName',
      sorter: (a, b) => a.firstName.localeCompare(b.firstName) // Tri de A à Z
    },
    { 
      title: 'Nom', 
      dataIndex: 'lastName', 
      key: 'lastName',
      sorter: (a, b) => a.lastName.localeCompare(b.lastName) // Tri de A à Z
    },
    { 
      title: 'Email', 
      dataIndex: 'email', 
      key: 'email',
      sorter: (a, b) => (a.email || '').localeCompare(b.email || '') // Tri avec gestion des emails vides
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: ClientModel): React.ReactElement => (
        <Space size="middle">
          <Link to="/clients/$clientId" params={{ clientId: record.id }}>
            <Button type="link">Détails</Button>
          </Link>
          <Popconfirm title="Supprimer ce client ?" onConfirm={(): void => deleteClient(record.id)} okText="Oui" cancelText="Non">
            <Button type="link" danger>Supprimer</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>Liste des Clients</h2>
        <Space>
          {/* Barre de recherche */}
          <Input.Search 
            placeholder="Rechercher un client..." 
            allowClear 
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setSearchText(e.target.value)} 
            style={{ width: 250 }} 
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={(): void => setIsModalOpen(true)}>
            Nouveau Client
          </Button>
        </Space>
      </div>

      {/* On utilise filteredClients comme source de données */}
      <Table<ClientModel> columns={columns} dataSource={filteredClients} rowKey="id" loading={isLoading} />

      <Modal title="Nouveau Client" open={isModalOpen} onCancel={(): void => setIsModalOpen(false)} onOk={(): void => form.submit()}>
        <Form<CreateClientModel> form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item name="firstName" label="Prénom" rules={[{ required: true }]}><Input placeholder="Jean" /></Form.Item>
          <Form.Item name="lastName" label="Nom" rules={[{ required: true }]}><Input placeholder="Dupont" /></Form.Item>
          <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}><Input placeholder="jean.dupont@exemple.com" /></Form.Item>
          <Form.Item name="photo" label="Photo (URL)"><Input /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}