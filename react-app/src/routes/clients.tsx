import React from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/clients')({
  component: (): React.ReactElement => <Outlet />,
});