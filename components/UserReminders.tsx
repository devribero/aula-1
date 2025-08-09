'use client';

import { useEffect, useState, useCallback } from 'react';

// Define a estrutura de um lembrete
interface Reminder {
  id: string;
  title: string;
  time: string;
  user_id: string;
}

interface UserRemindersProps {
  reminders: Reminder[];
  isLoading: boolean;
}

export default function UserReminders({ reminders, isLoading }: UserRemindersProps) {

  if (isLoading) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Meus Lembretes</h2>
        <div className="text-center text-lg mt-8 text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
          Carregando lembretes...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Meus Lembretes</h2>
      {!reminders || reminders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">Nenhum lembrete cadastrado.</p>
          <p className="text-gray-400 text-sm mt-2">Crie um novo lembrete para começar!</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {reminders.map((reminder) => (
            <li key={reminder.id} className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
              <p className="font-semibold text-lg text-gray-800">{reminder.title}</p>
              <p className="text-sm text-gray-500">Horário: {reminder.time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
