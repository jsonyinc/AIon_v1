"use client";

import React from 'react';
import { AuthProvider } from '@/components/AuthProvider';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
