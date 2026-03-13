import React, { useEffect, useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Table, Button, Space, Popconfirm, Modal, Form, Input, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getClients, deleteClient, createClient } from '../api/clients';
import type { Client, CreateClientDto } from '../types/client';

export const Route = createFileRoute('/clients/')({
  component: ClientsList,
});

function ClientsList(): React.ReactElement {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm<CreateClientDto>();

  const fetchClients = async (): Promise<void> => {
    try {
      setLoading(true);
      const data: Client[] = await getClients();
      setClients(data);
    } catch (error) {
      message.error('Erreur lors du chargement des clients');
    } finally {
      setLoading(false);
    }
  };

  useEffect((): void => {
    void fetchClients();
  }, []);

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteClient(id);
      message.success('Client supprimé avec succès');
      void fetchClients();
    } catch (error) {
      message.error('Erreur lors de la suppression');
    }
  };

  const handleCreate = async (values: CreateClientDto): Promise<void> => {
    try {
      await createClient(values);
      message.success('Client créé avec succès');
      setIsModalOpen(false);
      form.resetFields();
      void fetchClients();
    } catch (error) {
      console.error(error);
      message.error('Erreur lors de la création');
    }
  };

  const columns: ColumnsType<Client> = [
    { title: 'Prénom', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Nom', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: Client): React.ReactElement => (
        <Space size="middle">
          <Link to="/clients/$clientId" params={{ clientId: record.id }}>
            <Button type="link">Détails</Button>
          </Link>
          <Popconfirm
            title="Supprimer ce client ?"
            onConfirm={(): Promise<void> => handleDelete(record.id)}
            okText="Oui"
            cancelText="Non"
          >
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
        <Button type="primary" onClick={(): void => setIsModalOpen(true)}>
          Ajouter un client
        </Button>
      </div>

      <Table<Client> 
        columns={columns} 
        dataSource={clients} 
        rowKey="id" 
        loading={loading} 
      />

      <Modal
        title="Nouveau Client"
        open={isModalOpen}
        onCancel={(): void => setIsModalOpen(false)}
        // Modification ici : on utilise l'ID du formulaire pour soumettre
        onOk={(): void => form.submit()}
      >
        <Form<CreateClientDto> 
          form={form} 
          layout="vertical" 
          onFinish={handleCreate}
          // On ajoute un ID unique au formulaire
          id="create-client-form"
        >
          <Form.Item 
            name="firstName" 
            label="Prénom" 
            rules={[{ required: true, message: 'Le prénom est obligatoire' }]}
          >
            <Input placeholder="Jean" />
          </Form.Item>
          <Form.Item 
            name="lastName" 
            label="Nom" 
            rules={[{ required: true, message: 'Le nom est obligatoire' }]}
          >
            <Input placeholder="Dupont" />
          </Form.Item>
          <Form.Item 
            name="email" 
            label="Email" 
            rules={[
              { type: 'email', message: 'Email invalide' },
              { required: false }
            ]}
          >
            <Input placeholder="jean.dupont@exemple.com" />
          </Form.Item>
          <Form.Item name="photo" label="Lien de la photo (URL)">
            <Input placeholder="https://..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}