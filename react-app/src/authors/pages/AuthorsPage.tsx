import React from 'react';
import { Outlet } from '@tanstack/react-router';
import { AuthorList } from '../components/AuthorList';

export function AuthorsPage(): React.ReactElement {
  return (
    <div>
      <AuthorList />
      <Outlet />
    </div>
  );
}