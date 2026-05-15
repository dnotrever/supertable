# CLAUDE.md

## Stack

React 19 + TypeScript 5.9 + Vite 7 + TanStack Table 8 — biblioteca npm, sem framework de roteamento. Backend de dev: Flask 3 (Python 3.13), apenas para dados mock.

## Comandos do dia a dia

```bash
# Dev (requer Docker rodando)
make build                  # sobe backend (8002) e frontend (9002) em background
make logs                   # acompanha os dois serviços
make down                   # derruba tudo

# Build da biblioteca
npm run build               # tsc -p tsconfig.build.json && vite build → gera dist/

# Publicar no npm
make publish                # patch por padrão
make publish TYPE=minor
make publish TYPE=major
```

## Estrutura — o que não é óbvio

```
src/
  index.ts          ← único ponto de exportação pública da biblioteca
  Table/
    Table.tsx       ← componente principal; toda lógica de estado fica aqui
    Table.types.ts  ← todas as interfaces públicas e internas
    index.ts        ← re-exporta subcomponentes internos (não é a API pública)
  hooks/            ← cada hook é responsável por uma única preocupação de layout/interação
  utils/            ← funções puras; createXColumn retornam ColumnDef prontas para injetar
  styles/
    Table.scss      ← único arquivo de estilos; classes CSS controladas por props (borders-*, style-*)
  dev/              ← playground local; EXCLUÍDO do build (tsconfig.build.json › exclude)
    App.tsx         ← usa SuperTable com todas as props para teste manual
    api_test.ts     ← cliente fetch para o backend mock

development/
  backend/          ← Flask mock; não faz parte da lib publicada
  docker/
    Dockerfile      ← multistage: target=backend (Python) | target=frontend (Node)
    docker-compose.yml
```

## Convenções detectadas no código

- Componente exportado publicamente: `SuperTable` (não `Table`). `Table` foi o nome antigo — o README ainda usa `<Table>` em alguns trechos; o código-fonte usa `<SuperTable>`.
- Imports dentro de `src/`: caminhos relativos sem alias. Ordem: React → libs externas → tipos internos → hooks → utils → subcomponentes.
- Hooks nomeados `useXxx`, utils nomeados `createXxxColumn` ou verbo + substantivo.
- Variáveis e props em português no código de dev (`colunas`, `rodape`); código da lib em inglês.
- Não há testes automatizados — validação é manual via `src/dev/App.tsx`.

## Gotchas e armadilhas

- **`src/dev/` é excluído do build** via `tsconfig.build.json`. Qualquer import de `src/dev/` em arquivos da lib quebra o build silenciosamente na checagem de tipos.
- **`normalizeColumns` lança erro em runtime** se uma coluna não tiver `id` nem `accessorKey` do tipo string. Colunas de utilitário (`createDraggableColumn`, `createSelectableColumn`, `createExpandableColumn`) já definem `id` explicitamente.
- **Ordem de injeção de colunas especiais é fixa** em `Table.tsx`: draggable → selectable → expandable → colunas do usuário. Mudar essa ordem altera o visual sem erro.
- **Proxy `/api/` no Vite aponta para `http://backend:5000`** (DNS interno do Docker). Fora do Docker o proxy não funciona — o backend precisa estar acessível em `localhost:8002` separadamente.
- **`dist/` não é limpo antes do build** (`emptyOutDir: false` no vite.config). Arquivos órfãos de builds anteriores permanecem. Se renomear arquivos, remova `dist/` manualmente antes.
- **`simplebar-react` é dependência runtime** (não devDependency). O CSS dela é importado em `src/index.ts`, então o consumidor não precisa importar separadamente — mas precisa ter o pacote instalado (já é resolvido via `dependencies`).
- `fs.allow` no Vite está em `/app` (path do container). Localmente fora do Docker, o Vite usa o default e funciona normalmente.

## Não faça

- Não exporte nada diretamente de `src/Table/index.ts` como API pública — use `src/index.ts`.
- Não adicione lógica de fetch ou estado de servidor dentro dos hooks de `hooks/` — eles são exclusivamente de layout/interação DOM.
- Não coloque estado compartilhado fora de `Table.tsx`; os subcomponentes recebem tudo via props.
- Não use `console.log` em código da lib — remova antes de buildar.
- Não importe de `src/dev/` em nenhum arquivo fora de `src/dev/`.

## Validar uma mudança

```bash
# 1. Checar tipos (inclui src/dev, exclui do build real)
npx tsc --noEmit

# 2. Build da biblioteca
npm run build
# Verificar: dist/index.js, dist/index.d.ts, dist/super-table.css existem e não estão vazios

# 3. Testar visualmente
make build   # se Docker não estiver rodando
# Abrir http://localhost:9002 e exercitar a feature alterada em App.tsx
```

---

*Examinado: package.json, tsconfig.json/build/node, vite.config.ts, src/index.ts, src/Table/Table.tsx, src/Table/Table.types.ts, src/Table/index.ts, src/hooks/useTable.ts, src/utils/normalizeColumns.ts, src/dev/App.tsx, src/dev/api_test.ts, development/docker/Dockerfile, development/docker/docker-compose.yml, Makefile*
