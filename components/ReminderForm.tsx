'use client';

import { useState } from 'react';

// Define a interface para as props que este componente receberá
interface ReminderFormProps {
  onReminderAdded: () => void;
}

export default function ReminderForm({ onReminderAdded }: ReminderFormProps) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validação básica
    if (!title.trim()) {
      setError('O título é obrigatório.');
      setIsLoading(false);
      return;
    }

    if (!time.trim()) {
      setError('O horário é obrigatório.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ title: title.trim(), time: time.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
        throw new Error(errorData.error || 'Falha ao adicionar o lembrete.');
      }

      // Se o lembrete foi adicionado com sucesso, chama a função do componente pai
      onReminderAdded();
      
      // Limpa o formulário
      setTitle('');
      setTime('');
    } catch (err: any) {
      setError(err.message || 'Erro ao adicionar lembrete');
      console.error('Erro ao adicionar lembrete:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-inner mb-6">
      <h2 className="text-xl font-bold mb-4">Adicionar Novo Lembrete</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            disabled={isLoading}
            required
            placeholder="Digite o título do lembrete"
          />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Horário</label>
          <input
            id="time"
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Ex: 10:00"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            disabled={isLoading}
            required
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? 'Adicionando...' : 'Adicionar Lembrete'}
        </button>
      </form>
    </div>
  );
}
