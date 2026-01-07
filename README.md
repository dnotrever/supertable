# @dnotrever/super-table

Uma tabela React altamente customizável e rica em recursos, construída com TypeScript e TanStack Table.

## 📦 Instalação

```bash
npm install https://github.com/dnotrever/super_table_package.git
```

```bash
yarn add https://github.com/dnotrever/super_table_package.git
```

```bash
pnpm add https://github.com/dnotrever/super_table_package.git
```

## 🚀 Uso Básico

```tsx
import { Table } from '@dnotrever/super-table';
import type { Columns } from '@dnotrever/super-table';
import '@dnotrever/super-table/super-table.css';

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  const columns: Columns<User>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Nome',
    },
    {
      accessorKey: 'email',
      header: 'E-mail',
    },
  ];

  const data: User[] = [
    { id: 1, name: 'João Silva', email: 'joao@example.com' },
    { id: 2, name: 'Maria Santos', email: 'maria@example.com' },
  ];

  return (
    <Table
      header={columns}
      data={data}
    />
  );
}
```

## 📋 Props Principais

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `header` | `Columns<T>[]` | **obrigatório** | Array de definições de colunas |
| `data` | `T[]` | **obrigatório** | Array de dados a serem exibidos |
| `footer` | `ReactNode` | `undefined` | Conteúdo customizado para o rodapé externo |
| `tableHeight` | `string` | `'400px'` | Altura da tabela |
| `defaultTextAlign` | `'left' \| 'center' \| 'right'` | `'left'` | Alinhamento padrão do texto |
| `borders` | `'full' \| 'simple' \| 'none'` | `'full'` | Estilo das bordas da tabela |
| `stripedRows` | `boolean` | `false` | Ativa linhas zebradas |
| `hoverableRow` | `boolean` | `false` | Ativa efeito hover nas linhas |
| `onDataChange` | `(data: T[]) => void` | `undefined` | Callback chamado quando os dados mudam |

## 🔧 Funcionalidades Avançadas

### Colunas Redimensionáveis

```tsx
<Table
  header={columns}
  data={data}
  resizableCol
/>
```

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `resizableCol` | `boolean` | `false` | Permite redimensionar colunas |

### Reordenação de Colunas

```tsx
<Table
  header={columns}
  data={data}
  reorderableCol
/>
```

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `reorderableCol` | `boolean` | `false` | Permite reordenar colunas via drag & drop |

### Ordenação (Sorting)

```tsx
import type { Columns } from '@dnotrever/super-table';

const [sort, setSort] = useState<SortState | null>(null);

<Table
  header={columns}
  data={data}
  sortableCol
  onSortChange={setSort}
/>
```

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `sortableCol` | `boolean` | `true` | Ativa ordenação nas colunas |
| `onSortChange` | `(sort: SortState \| null) => void` | `undefined` | Callback quando a ordenação muda |

**Interface SortState:**

```typescript
interface SortState {
  columnId: string;
  direction: 'asc' | 'desc';
}
```

### Edição de Células

```tsx
const [tableData, setTableData] = useState(data);

<Table
  header={columns}
  data={tableData}
  editable
  onDataChange={setTableData}
/>
```

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `editable` | `boolean` | `false` | Permite editar células da tabela |

### Arrastar Linhas (Drag & Drop)

```tsx
<Table
  header={columns}
  data={data}
  draggable
  draggableSticky
/>
```

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `draggable` | `boolean` | `false` | Adiciona coluna com ícone para arrastar linhas |
| `draggableSticky` | `boolean` | `false` | Torna a coluna de drag fixa à esquerda |

### Seleção de Linhas

```tsx
<Table
  header={columns}
  data={data}
  selectable={{
    sticky: true,
    label: 'Selecionar',
    disableSelectRow: [2, 4],
    initialSelectRow: [1, 3]
  }}
/>
```

| Prop | Tipo | Descrição |
|------|------|-----------|
| `selectable` | `SelectableProps` | Configurações de seleção de linhas |

**Interface SelectableProps:**

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `label` | `string` | Texto do cabeçalho da coluna de seleção |
| `sticky` | `boolean` | Torna a coluna de seleção fixa |
| `disableSelectRow` | `(string \| number)[]` | IDs das linhas que não podem ser selecionadas |
| `initialSelectRow` | `(string \| number)[]` | IDs das linhas inicialmente selecionadas |

### Linhas Expansíveis

```tsx
<Table
  header={columns}
  data={data}
  expandable={{
    sticky: true,
    clickRow: true,
    allButton: true,
    content: (row) => (
      <div>
        <h3>Detalhes de {row.name}</h3>
        <p>Email: {row.email}</p>
      </div>
    ),
  }}
/>
```

| Prop | Tipo | Descrição |
|------|------|-----------|
| `expandable` | `ExpandableProps<T>` | Configurações de linhas expansíveis |

**Interface ExpandableProps:**

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `content` | `(row: T) => ReactNode` | Função que renderiza o conteúdo expandido |
| `clickRow` | `boolean` | Permite expandir clicando na linha inteira |
| `sticky` | `boolean` | Torna a coluna de expansão fixa |
| `allButton` | `boolean` | Adiciona botão para expandir/colapsar todas |

### Paginação

```tsx
const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(15);
const [totalItems, setTotalItems] = useState(100);

const handlePageChange = (page: number, newPageSize: number) => {
  setCurrentPage(page);
  setPageSize(newPageSize);
};

<Table
  header={columns}
  data={data}
  pagination={{
    currentPage,
    pageSize,
    totalItems,
    pageSizeOptions: [15, 30, 60, 120],
    onPageChange: handlePageChange,
  }}
/>
```

| Prop | Tipo | Descrição |
|------|------|-----------|
| `pagination` | `PaginationProps` | Configurações de paginação |

**Interface PaginationProps:**

| Propriedade | Tipo | Obrigatório | Descrição |
|-------------|------|-------------|-----------|
| `currentPage` | `number` | ✅ | Página atual (1-indexed) |
| `totalItems` | `number` | ✅ | Total de itens |
| `pageSize` | `number` | ✅ | Tamanho da página |
| `initialPageSize` | `number` | ❌ | Tamanho inicial da página |
| `pageSizeOptions` | `number[]` | ❌ | Opções de tamanho de página |
| `onPageChange` | `(page: number, pageSize: number) => void` | ✅ | Callback de mudança de página |

## 📐 Configuração de Colunas

### Estrutura Básica

```tsx
const columns: Columns<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    meta: {
      widthSize: '50px',
      textAlign: 'center',
      resizable: false,
      reorderable: false,
      sortable: false,
    },
  },
];
```

### Propriedades Meta das Colunas

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `widthSize` | `string` | Largura da coluna (ex: '300px', '15%') |
| `textAlign` | `'left' \| 'center' \| 'right'` | Alinhamento do texto |
| `sticky` | `'left' \| 'right'` | Torna a coluna fixa à esquerda ou direita |
| `resizable` | `boolean` | Permite redimensionar esta coluna |
| `reorderable` | `boolean` | Permite reordenar esta coluna |
| `sortable` | `boolean` | Permite ordenar por esta coluna |
| `internalHeader` | `ReactNode \| (() => ReactNode)` | Header interno customizado |
| `internalFooter` | `ReactNode \| (() => ReactNode)` | Footer interno customizado |

### Header Customizado

```tsx
{
  accessorKey: 'status',
  header: () => (
    <div style={{ color: 'blue', fontWeight: 'bold' }}>
      Status Customizado
    </div>
  ),
}
```

### Cell Customizado

```tsx
{
  accessorKey: 'email',
  header: 'E-mail',
  cell: ({ row }) => {
    const email = row.original.email;
    return (
      <a 
        href={`mailto:${email}`}
        style={{ color: 'blue', textDecoration: 'underline' }}
      >
        {email}
      </a>
    );
  },
}
```

### Colunas Fixas (Sticky)

```tsx
{
  accessorKey: 'name',
  header: 'Nome',
  meta: {
    sticky: 'left',
    widthSize: '200px',
  },
}
```

## 🎨 Exemplo Completo

```tsx
import { useState, useEffect } from 'react';
import { Table } from '@dnotrever/super-table';
import type { Columns, SortState } from '@dnotrever/super-table';
import '@dnotrever/super-table/super-table.css';

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
}

function App() {
  const columns: Columns<User>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      meta: {
        widthSize: '80px',
        textAlign: 'center',
        resizable: false,
        sortable: false,
      },
    },
    {
      accessorKey: 'name',
      header: 'Nome',
      meta: {
        widthSize: '300px',
        sticky: 'left',
      },
    },
    {
      accessorKey: 'email',
      header: 'E-mail',
      meta: {
        widthSize: '300px',
      },
      cell: ({ row }) => (
        <a href={`mailto:${row.original.email}`}>
          {row.original.email}
        </a>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      meta: {
        widthSize: '150px',
        textAlign: 'center',
      },
    },
  ];

  const [data, setData] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [totalItems, setTotalItems] = useState(0);
  const [sort, setSort] = useState<SortState | null>(null);

  useEffect(() => {
    // Buscar dados da API
    fetchUsers({
      page: currentPage,
      pageSize,
      sortColumn: sort?.columnId,
      sortDirection: sort?.direction,
    }).then((response) => {
      setData(response.data);
      setTotalItems(response.total);
    });
  }, [currentPage, pageSize, sort]);

  const handlePageChange = (page: number, newPageSize: number) => {
    setCurrentPage(page);
    setPageSize(newPageSize);
  };

  return (
    <Table
      header={columns}
      data={data}
      tableHeight="calc(100vh - 200px)"
      resizableCol
      reorderableCol
      sortableCol
      onSortChange={setSort}
      editable
      onDataChange={setData}
      selectable={{
        sticky: true,
        label: 'Selecionar',
      }}
      expandable={{
        sticky: true,
        clickRow: true,
        content: (row) => (
          <div style={{ padding: '10px' }}>
            <h4>Detalhes de {row.name}</h4>
            <p>ID: {row.id}</p>
            <p>E-mail: {row.email}</p>
            <p>Status: {row.status}</p>
          </div>
        ),
      }}
      pagination={{
        currentPage,
        pageSize,
        totalItems,
        pageSizeOptions: [15, 30, 60, 120],
        onPageChange: handlePageChange,
      }}
      hoverableRow
      stripedRows
      borders="simple"
    />
  );
}
```

## 🎯 Casos de Uso Comuns

### Tabela Simples

```tsx
<Table
  header={columns}
  data={data}
/>
```

### Tabela com Paginação e Ordenação

```tsx
<Table
  header={columns}
  data={data}
  sortableCol
  onSortChange={setSort}
  pagination={{
    currentPage,
    pageSize,
    totalItems,
    onPageChange: handlePageChange,
  }}
/>
```

### Tabela Editável

```tsx
<Table
  header={columns}
  data={data}
  editable
  onDataChange={setData}
/>
```

### Tabela com Seleção

```tsx
<Table
  header={columns}
  data={data}
  selectable={{
    sticky: true,
    initialSelectRow: [1, 2, 3],
  }}
/>
```

### Tabela com Todas as Funcionalidades

```tsx
<Table
  header={columns}
  data={data}
  tableHeight="600px"
  resizableCol
  reorderableCol
  sortableCol
  editable
  draggable
  selectable={{ sticky: true }}
  expandable={{
    sticky: true,
    content: (row) => <div>Detalhes</div>,
  }}
  pagination={{
    currentPage,
    pageSize,
    totalItems,
    onPageChange: handlePageChange,
  }}
  hoverableRow
  stripedRows
/>
```

## 🎨 Estilização

O componente vem com estilos padrão, mas você pode customizá-los:

```tsx
import '@dnotrever/super-table/super-table.css';
```

Para customizar, você pode sobrescrever as classes CSS ou adicionar seus próprios estilos.

## 📝 TypeScript

O componente é totalmente tipado com TypeScript. Para melhor experiência:

```tsx
import type { Columns, SortState, PaginationProps } from '@dnotrever/super-table';

interface MyData {
  id: number;
  // ... seus campos
}

const columns: Columns<MyData>[] = [...];
```
