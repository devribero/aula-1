import React from 'react';
import Header from '../../../components/header';

export default function ContatoPage() {
  return (
    <div className="container">
      <Header />
      <main className="mt-4">
        <h1 className="text-center">Entre em Contato</h1>
        <p className="text-center">
          Esta é a página de contato do nosso assistente.
        </p>
        
        <div className="p-4">
          <h2>Informações de Contato</h2>
          <p>Email: contato@exemplo.com</p>
          <p>Telefone: (11) 99999-9999</p>
          <p>Endereço: Rua Exemplo, 123 - São Paulo, SP</p>
        </div>
      </main>
    </div>
  );
}