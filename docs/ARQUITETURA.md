# Decisões de arquitetura — Agostina

Documento curto registrando as escolhas técnicas e o porquê de cada uma.

## Contexto

Sistema web para um brechó físico (Olinda/PE). Precisa de:
- uma vitrine pública das roupas disponíveis;
- página de entrada com a identidade visual da loja;
- área de administração (login) para gerenciar estoque: cadastrar, editar preço,
  marcar como vendida/remover e ver um resumo.

Restrições: é um **projeto pessoal**, mantido por uma pessoa, com orçamento zero.
Prioridade em **baixa manutenção** e **plano gratuito**.

## Decisão

### Frontend — React + Vite + TypeScript + Tailwind CSS
- **React + Vite**: padrão de mercado, desenvolvimento rápido, ótima documentação.
- **TypeScript**: segurança de tipos evita bugs e melhora a manutenção.
- **Tailwind CSS**: recria com facilidade a identidade da loja (creme/azul/dourado,
  cantos arredondados, estilo feito à mão) e mantém o CSS organizado.

### Back-end — Supabase (em vez de servidor próprio)
O Supabase entrega num único serviço gerenciado:
- **PostgreSQL**: banco relacional, ideal para o catálogo de peças.
- **Auth**: login de administrador pronto — atende ao requisito "pessoa normal vs admin"
  sem precisar escrever autenticação do zero.
- **Storage**: armazenamento das fotos das roupas (melhor que guardar imagem no banco).
- **API automática + Row Level Security (RLS)**: o frontend fala direto com o Supabase;
  as regras de acesso ficam no banco (visitante só lê peças disponíveis; só admin escreve).

### Hospedagem — Vercel + Supabase
Ambos com plano gratuito suficiente para uma loja desse porte e com deploy automático
a partir do GitHub.

## Alternativas consideradas

| Opção | Por que não (por agora) |
|-------|--------------------------|
| Back-end próprio (Node/Express ou similar) | Mais código e manutenção sem ganho real; Supabase já cobre banco, auth e storage com segurança. |
| Banco NoSQL (ex.: Firestore) | Os dados são bem relacionais (peças, categorias, status); PostgreSQL modela melhor. |
| Guardar fotos como base64 no banco | Pesa o banco e a API; Storage dedicado é mais barato e rápido. |

## Consequências

- **Positivo**: pouquíssimo código de servidor; segurança centralizada no banco (RLS);
  deploy simples; tudo no plano gratuito.
- **Atenção**: dependência da plataforma Supabase. Caso um dia precise de lógica de
  servidor específica, o caminho é adicionar **Supabase Edge Functions** (TypeScript),
  sem reescrever o que já existe.

## Modelo de dados (resumo)

`products`: `id`, `name`, `description`, `category`, `size`, `price`, `image_url`,
`status` (`available` | `sold`), `created_at`, `updated_at`.

Detalhes, índices e políticas de acesso em [`../supabase/schema.sql`](../supabase/schema.sql).
