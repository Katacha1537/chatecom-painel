'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const sessionOn = sessionStorage.getItem('sessionVALUE');
    const correctToken = process.env.NEXT_PUBLIC_PASSWORD;

    if (sessionOn === correctToken) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-white text-xl">Carregando...</div>
    </div>
  );
}
