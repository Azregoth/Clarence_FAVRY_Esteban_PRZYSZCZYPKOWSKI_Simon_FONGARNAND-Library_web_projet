import React, { useEffect, useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Card, Form, Input, Button, message, List, Skeleton, Typography } from 'antd';
import { getClient, updateClient } from '../api/clients';
import type { Client, CreateClientDto, ClientSale } from '../types/client';

export const Route = createFileRoute('/clients/$clientId')({
  component: ClientDetail,
});

function ClientDetail(): React.ReactElement {
  const { clientId } = Route.useParams();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [form] = Form.useForm<CreateClientDto>();

  useEffect((): void => {
    const fetchDetail = async (): Promise<void> => {
      try {
        setLoading(true);
        const data: Client = await getClient(clientId);
        setClient(data);
        form.setFieldsValue(data);
      } catch (error) {
        message.error('Erreur lors du chargement du client');
      } finally {
        setLoading(false);
      }
    };
    void fetchDetail();
  }, [clientId, form]);

  const handleUpdate = async (values: CreateClientDto): Promise<void> => {
    try {
      const updated: Client = await updateClient(clientId, values);
      setClient(updated);
      setEditMode(false);
      message.success('Client mis à jour');
    } catch (error) {
      message.error('Erreur lors de la mise à jour');
    }
  };

  if (loading) return <Skeleton active />;
  if (!client) return <div>Client introuvable</div>;

  return (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <Card title="Détails du Client" style={{ flex: 1, minWidth: '300px' }}>
        {!editMode ? (
          <div>
            {client.photo && <img src={client.photo} alt="Profil" style={{ width: 100, borderRadius: '50%', marginBottom: 16 }} />}
            <Typography.Paragraph><strong>Prénom:</strong> {client.firstName}</Typography.Paragraph>
            <Typography.Paragraph><strong>Nom:</strong> {client.lastName}</Typography.Paragraph>
            <Typography.Paragraph><strong>Email:</strong> {client.email || 'N/A'}</Typography.Paragraph>
            <Button type="primary" onClick={(): void => setEditMode(true)}>Éditer</Button>
          </div>
        ) : (
          <Form<CreateClientDto> form={form} layout="vertical" onFinish={handleUpdate}>
            <Form.Item name="firstName" label="Prénom" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="lastName" label="Nom" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}><Input /></Form.Item>
            <Form.Item name="photo" label="Photo URL"><Input /></Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>Sauvegarder</Button>
            <Button onClick={(): void => setEditMode(false)}>Annuler</Button>
          </Form>
        )}
      </Card>

      <Card title="Livres Achetés" style={{ flex: 1, minWidth: '300px' }}>
        <List<ClientSale>
          itemLayout="horizontal"
          dataSource={client.sales || []}
          renderItem={(sale: ClientSale): React.ReactElement => (
            <List.Item>
              <List.Item.Meta
                title={
                    <Link 
                        to="/books/$bookId" 
                        params={{ bookId: sale.book.id }}
                    >
                        {sale.book.title}
                    </Link>
                    }
                description={`Acheté le : ${new Date(sale.date).toLocaleDateString()}`}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}