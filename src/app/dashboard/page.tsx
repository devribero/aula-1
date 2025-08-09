'use client';

import { useEffect, useState, useCallback } from 'react';
import UserReminders from '../../../components/UserReminders';
import ReminderForm from '../../../components/ReminderForm';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

// Define a estrutura de um lembrete
interface Reminder {
  id: string;
  title: string;
  time: string;
  user_id: string;
}

export default function DashboardPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  // Função para buscar os lembretes do usuário
  const fetchReminders = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/reminders', { 
        method: 'GET',
        credentials: 'include'
      });
      
      // Se o usuário não estiver logado, a API retorna 401. Redirecionamos para o login.
      if (response.status === 401) {
        router.push('/login');
        return;
      }
      
      if (!response.ok) {
        throw new Error('Falha ao carregar os lembretes.');
      }
      
      const data = await response.json();
      setReminders(data || []);
    } catch (error) {
      console.error('Erro ao carregar lembretes:', error);
      setReminders([]);
    } finally {
      setIsLoading(false);
    }
  }, [router, isAuthenticated]);

  // UseEffect para verificar autenticação
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          router.push('/login');
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [supabase, router]);

  // UseEffect para carregar lembretes quando autenticado
  useEffect(() => {
    if (isAuthenticated) {
      fetchReminders();
    }
  }, [isAuthenticated, fetchReminders]);

  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Meu Assistente de Rotina</h1>
      <ReminderForm onReminderAdded={fetchReminders} />
      <UserReminders reminders={reminders} isLoading={isLoading} />
    </main>
  );
}
