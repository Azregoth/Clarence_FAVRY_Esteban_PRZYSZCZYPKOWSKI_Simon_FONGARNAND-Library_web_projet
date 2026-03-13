import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, Space, Typography, Skeleton, List, Statistic, Row, Col } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from '@tanstack/react-router';
import { useAuthorDetailsProvider } from '../providers/useAuthorDetailsProvider';
import type { UpdateAuthorModel } from '../AuthorModel';

interface AuthorDetailsProps {
  id: string;
}

export function AuthorDetails({ id }: AuthorDetailsProps): React.ReactElement {
  const { author, isLoading, loadAuthor, updateAuthor } = useAuthorDetailsProvider(id);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [form] = Form.useForm<UpdateAuthorModel>();

  useEffect((): void => {
    loadAuthor();
  }, [id]);

  useEffect((): void => {
    if (author) form.setFieldsValue(author);
  }, [author, form]);

  const handleUpdate = (values: UpdateAuthorModel): void => {
    updateAuthor(values);
    setEditMode(false);
  };

  if (isLoading && !author) return <Skeleton active />;
  if (!author) return <div>Auteur introuvable</div>;

  // Calculs stricts demandés pour le projet
  const totalBooks: number = author.books?.length || 0;
  const totalSales: number = author.books?.reduce((acc, book) => acc + (book.sales?.length || 0), 0) || 0;
  const averageSales: string = totalBooks > 0 ? (totalSales / totalBooks).toFixed(2) : '0';

  return (
    <Space direction="vertical" style={{ textAlign: 'left', width: '95%', marginTop: 16 }}>
      <Link to="/authors" style={{ fontSize: '1.2rem', marginBottom: 16, display: 'inline-block' }}>
        <ArrowLeftOutlined /> Retour aux auteurs
      </Link>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card title="Détails de l'Auteur">
            {!editMode ? (
              <div>
                {author.photo && <img src={author.photo} alt="Profil" style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', marginBottom: 16 }} />}
                <Typography.Title level={2}>{author.firstName} {author.lastName}</Typography.Title>
                <Space style={{ marginTop: 16 }}>
                  <Button type="primary" onClick={(): void => setEditMode(true)}>Éditer</Button>
                </Space>
              </div>
            ) : (
              <Form<UpdateAuthorModel> form={form} layout="vertical" onFinish={handleUpdate}>
                <Form.Item name="firstName" label="Prénom" rules={[{ required: true }]}><Input /></Form.Item>
                <Form.Item name="lastName" label="Nom" rules={[{ required: true }]}><Input /></Form.Item>
                <Form.Item name="photo" label="Photo (URL)"><Input /></Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>Sauvegarder</Button>
                <Button onClick={(): void => setEditMode(false)}>Annuler</Button>
              </Form>
            )}
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Statistiques" style={{ marginBottom: 24 }}>
            <Row gutter={16}>
              <Col span={12}><Statistic title="Livres écrits" value={totalBooks} /></Col>
              <Col span={12}><Statistic title="Ventes moyennes par livre" value={averageSales} suffix="ventes" /></Col>
            </Row>
          </Card>

          <Card title="Bibliographie">
            <List
              itemLayout="horizontal"
              dataSource={author.books || []}
              renderItem={(book): React.ReactElement => (
                <List.Item>
                  <List.Item.Meta
                    title={<Link to="/books/$bookId" params={{ bookId: book.id }}>{book.title}</Link>}
                    description={`Année: ${book.yearPublished} | Ventes: ${book.sales?.length || 0}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </Space>
  );
}