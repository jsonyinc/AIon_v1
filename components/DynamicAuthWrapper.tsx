"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const DynamicAuthProvider = dynamic(() => import('@/components/AuthProvider').then(mod => mod.AuthProvider), {
  ssr: false,
  loading: () => null, // AuthProvider 로딩 중에는 아무것도 렌더링하지 않음
});

export default function DynamicAuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <DynamicAuthProvider>
      {children}
    </DynamicAuthProvider>
  );
}
