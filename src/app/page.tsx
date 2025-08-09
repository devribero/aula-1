import React from 'react';
import Header from '../../components/header';

export default function Home() {
  return (
    <div className="container">
      <Header />
      <main className="mt-4">
        <h1 className="text-center">Bem-vindo ao Next.js</h1>
        <p className="text-center">
          Este é um projeto Next.js usando CSS puro em vez do Tailwind CSS.
        </p>
      </main>
    </div>
  );
}
