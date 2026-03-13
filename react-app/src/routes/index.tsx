import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Typography, Row, Col, Card } from 'antd';
import { 
  BookOutlined, 
  UserOutlined, 
  TeamOutlined, 
  DollarOutlined 
} from '@ant-design/icons';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage(): React.ReactElement {
  const { Title, Paragraph } = Typography;

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px', marginTop: '24px' }}>
        <Title level={1} style={{ margin: 0, color: '#1890ff' }}>
          Library Manager Pro
        </Title>
        <Paragraph style={{ fontSize: '1.2rem', color: '#666', marginTop: '12px' }}>
          Votre tableau de bord central pour la gestion de votre bibliothèque.
        </Paragraph>
      </div>

      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} sm={12} md={6}>
          <Link to="/books">
            <Card hoverable style={{ textAlign: 'center', borderRadius: '12px', height: '100%' }}>
              <BookOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
              <Title level={4}>Livres</Title>
              <Paragraph type="secondary">Gérer le catalogue et le stock</Paragraph>
            </Card>
          </Link>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Link to="/authors">
            <Card hoverable style={{ textAlign: 'center', borderRadius: '12px', height: '100%' }}>
              <UserOutlined style={{ fontSize: '48px', color: '#52c41a', marginBottom: '16px' }} />
              <Title level={4}>Auteurs</Title>
              <Paragraph type="secondary">Gérer la liste des écrivains</Paragraph>
            </Card>
          </Link>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Link to="/clients">
            <Card hoverable style={{ textAlign: 'center', borderRadius: '12px', height: '100%' }}>
              <TeamOutlined style={{ fontSize: '48px', color: '#722ed1', marginBottom: '16px' }} />
              <Title level={4}>Clients</Title>
              <Paragraph type="secondary">Gérer la base de lecteurs</Paragraph>
            </Card>
          </Link>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Link to="/sales">
            <Card hoverable style={{ textAlign: 'center', borderRadius: '12px', height: '100%' }}>
              <DollarOutlined style={{ fontSize: '48px', color: '#faad14', marginBottom: '16px' }} />
              <Title level={4}>Ventes</Title>
              <Paragraph type="secondary">Historique des achats</Paragraph>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
}