'use client'; // Esta diretiva é necessária para que este componente funcione no navegador

import { Auth } from '@supabase/auth-ui-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Se você usa o tema escuro, pode usar o 'dark'
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  // Verifica se o usuário já está logado e o redireciona
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Redireciona o usuário para a página inicial se ele já estiver logado
        router.push('/');
      }
    });
  }, [supabase, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Bem-vindo(a) ao seu Assistente de Rotina</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['github', 'google']} // Exemplo: permite login com GitHub e Google
          magicLink={true}
          redirectTo="http://localhost:3000/" // URL para onde o Supabase vai redirecionar após o login
        />
      </div>
    </div>
  );
}
