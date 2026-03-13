import React, { useState } from 'react';
import { Link, useMatches } from '@tanstack/react-router';
import { Layout as AntLayout, Menu, Breadcrumb } from 'antd';
import { 
  BookOutlined, 
  HomeOutlined, 
  UserOutlined, 
  TeamOutlined, 
  DollarOutlined 
} from '@ant-design/icons';

// Imports stricts générés par TanStack Router
import { Route as indexRoute } from './routes/index';
import { Route as booksRoute } from './routes/books';
import { Route as authorsRoute } from './routes/authors';
import { Route as clientsRoute } from './routes/clients';
import { Route as salesRoute } from './routes/sales';

const { Header, Content, Footer, Sider } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.ReactElement {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const matches = useMatches();

  // Définition du menu latéral avec les icônes d'Ant Design
  const menuItems = [
    { key: indexRoute.to, icon: <HomeOutlined />, label: <Link to={indexRoute.to}>Accueil</Link> },
    { key: booksRoute.to, icon: <BookOutlined />, label: <Link to={booksRoute.to}>Livres</Link> },
    { key: authorsRoute.to, icon: <UserOutlined />, label: <Link to={authorsRoute.to}>Auteurs</Link> },
    { key: clientsRoute.to, icon: <TeamOutlined />, label: <Link to={clientsRoute.to}>Clients</Link> },
    { key: salesRoute.to, icon: <DollarOutlined />, label: <Link to={salesRoute.to}>Ventes</Link> },
  ];

  // Le fil d'Ariane (Breadcrumb) est généré dynamiquement en fonction des routes actives
  const breadcrumbItems = matches.map((match) => {
    const routeId: string = match.routeId === '/' ? 'Accueil' : match.routeId.split('/').pop() || '';
    const title: string = routeId.charAt(0).toUpperCase() + routeId.slice(1);
    
    return {
      title: <Link to={match.pathname}>{title}</Link>,
      key: match.routeId,
    };
  });

  // On récupère la route active pour mettre en surbrillance le bon onglet dans le menu
  const activeRoute = matches[matches.length - 1]?.pathname || '/';

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value: boolean): void => setCollapsed(value)}
      >
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 6 }} />
        <Menu 
          theme="dark" 
          selectedKeys={[activeRoute]} 
          mode="inline" 
          items={menuItems} 
        />
      </Sider>
      
      <AntLayout>
        <Header style={{ padding: 0, background: '#fff' }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbItems} />
          <div style={{ padding: 24, minHeight: 360, background: '#fff', borderRadius: 8 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Library Web Project ©{new Date().getFullYear()}
        </Footer>
      </AntLayout>
    </AntLayout>
  );
}