import React from 'react';
import { SaleList } from '../components/SaleList';

export function SalesPage(): React.ReactElement {
  return (
    <div style={{ padding: '20px' }}>
      <SaleList />
    </div>
  );
}