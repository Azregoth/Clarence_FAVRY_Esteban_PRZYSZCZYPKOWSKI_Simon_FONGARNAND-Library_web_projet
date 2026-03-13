import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, List, Skeleton, Typography, Space } from 'antd';
import { Link } from '@tanstack/react-router';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useClientDetailsProvider } from '../providers/useClientDetailsProvider';
import type { UpdateClientModel } from '../ClientModel';

interface ClientDetailsProps {
  id: string;
}

export function ClientDetails({ id }: ClientDetailsProps): React.ReactElement {
  const { client, isLoading, loadClient, updateClient } = useClientDetailsProvider(id);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [form] = Form.useForm<UpdateClientModel>();

  useEffect((): void => {
    loadClient();
  }, [id]);

  useEffect((): void => {
    if (client) form.setFieldsValue(client);
  }, [client, form]);

  const handleUpdate = (values: UpdateClientModel): void => {
    updateClient(values);
    setEditMode(false);
  };

  if (isLoading && !client) return <Skeleton active />;
  if (!client) return <div>Client introuvable</div>;

  return (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: 16 }}>
      <div style={{ width: '100%', marginBottom: 16 }}>
        <Link to="/clients" style={{ fontSize: '1.2rem' }}>
          <ArrowLeftOutlined /> Retour aux clients
        </Link>
      </div>

      <Card title="Détails du Client" style={{ flex: 1, minWidth: '300px' }}>
        {!editMode ? (
          <div>
            {client.photo && <img src={client.photo} alt="Profil" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', marginBottom: 16 }} />}
            <Typography.Title level={3}>{client.firstName} {client.lastName}</Typography.Title>
            <Typography.Paragraph>Email: {client.email || 'Non renseigné'}</Typography.Paragraph>
            <Button type="primary" onClick={(): void => setEditMode(true)}>Éditer</Button>
          </div>
        ) : (
          <Form<UpdateClientModel> form={form} layout="vertical" onFinish={handleUpdate}>
            <Form.Item name="firstName" label="Prénom" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="lastName" label="Nom" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}><Input /></Form.Item>
            <Form.Item name="photo" label="Photo URL"><Input /></Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">Sauvegarder</Button>
              <Button onClick={(): void => setEditMode(false)}>Annuler</Button>
            </Space>
          </Form>
        )}
      </Card>

      <Card title="Livres Achetés" style={{ flex: 1, minWidth: '300px' }}>
        <List
          itemLayout="horizontal"
          dataSource={client.sales || []}
          renderItem={(sale): React.ReactElement => (
            <List.Item>
              <List.Item.Meta
                title={<Link to="/books/$bookId" params={{ bookId: sale.book.id }}>{sale.book.title}</Link>}
                description={`Acheté le : ${new Date(sale.date).toLocaleDateString()}`}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}