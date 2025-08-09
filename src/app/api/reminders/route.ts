import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * Função para buscar os lembretes do usuário logado (método HTTP GET)
 * @returns {NextResponse} Uma resposta JSON com a lista de lembretes ou um erro
 */
export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Obtém as informações do usuário logado através do token de autenticação
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    // Verifica se o usuário está logado
    if (userError || !user) {
      return NextResponse.json({ error: 'Você precisa estar logado para ver seus lembretes.' }, { status: 401 });
    }

    // Busca na tabela 'reminders' APENAS os lembretes onde o user_id é igual ao id do usuário logado
    const { data: reminders, error } = await supabase
      .from('reminders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar lembretes:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(reminders || []);
  } catch (error) {
    console.error('Erro inesperado:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

/**
 * Função para adicionar um novo lembrete (método HTTP POST)
 */
export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { title, time, ...rest } = await request.json();

    if (!title || !time) {
      return NextResponse.json({ error: 'Título e horário são obrigatórios.' }, { status: 400 });
    }

    // Verifica se o usuário está logado antes de permitir a criação
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: 'Você precisa estar logado para criar um lembrete.' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('reminders')
      .insert([{ title, time, user_id: user.id, ...rest }])
      .select();

    if (error) {
      console.error('Erro ao criar lembrete:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Erro inesperado:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
