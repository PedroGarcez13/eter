# Agostina 🧵

Sistema web do brechó **Agostina** — Rua de São Bento 233, Olinda/PE.

Uma vitrine online das peças disponíveis, com página de entrada acolhedora baseada
na identidade visual da loja (estilo feito à mão, paleta creme + azul + dourado, com a cara de Olinda),
e uma área de administração para gerenciar o estoque.

## Funcionalidades

**Para visitantes**
- Página de entrada com a identidade da loja e informações de visita
- Vitrine das roupas disponíveis, com busca e filtros por categoria e tamanho

**Para administradores** (acesso protegido por login)
- Cadastrar peças novas (com foto, descrição, categoria, tamanho e preço)
- Atualizar preços e dados das peças
- Marcar peças como vendidas ou removê-las do estoque
- Painel com resumo do estoque (peças disponíveis, valor em estoque, vendas)

## Stack

| Camada        | Tecnologia                                   |
|---------------|----------------------------------------------|
| Frontend      | React + Vite + TypeScript + Tailwind CSS     |
| Back-end/API  | Supabase (PostgreSQL + Auth + Storage + API) |
| Hospedagem    | Vercel (frontend) · Supabase (back-end)      |
| Qualidade     | ESLint + Prettier · Vitest                   |

Veja os detalhes e o porquê de cada escolha em [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md).

## Estrutura do projeto (planejada)

```
agostina/
├─ docs/                 # decisões de arquitetura
├─ supabase/
│  └─ schema.sql         # tabelas, políticas (RLS) e bucket de imagens
├─ src/                  # código do frontend (React + Vite)
│  ├─ components/
│  ├─ pages/             # Início, Vitrine, Admin
│  ├─ lib/               # cliente Supabase, helpers
│  └─ styles/
├─ prototipo/
│  └─ agostina.html      # protótipo navegável (referência de design)
├─ .env.example
└─ README.md
```

## Como rodar (depois do scaffold do frontend)

```bash
# 1. instalar dependências
npm install

# 2. configurar variáveis de ambiente
cp .env.example .env        # preencha com as chaves do seu projeto Supabase

# 3. rodar em desenvolvimento
npm run dev
```

## Banco de dados

O schema (tabela de produtos, políticas de acesso e bucket de imagens) está em
[`supabase/schema.sql`](supabase/schema.sql). Rode-o no SQL Editor do painel do Supabase
ao criar o projeto.

## Roadmap

- [x] Protótipo navegável de design
- [x] Definição de arquitetura e stack
- [x] Scaffold do frontend (Vite + React + TS + Tailwind)
- [x] Página de entrada
- [x] Vitrine (com busca e filtros)
- [x] Modo admin + CRUD de estoque + upload de fotos
- [x] Camada de dados com Supabase (e fallback de demonstração)
- [ ] Criar projeto no Supabase e aplicar o schema
- [ ] Conectar as chaves do Supabase (.env)
- [ ] Login de admin com Supabase Auth
- [ ] Deploy na Vercel

> Estado atual: o app roda em **modo demonstração** (dados no navegador) e passa a
> usar o banco real assim que as variáveis do Supabase forem configuradas no `.env`.

---
feito com carinho ♡
