# SuperTable

Uma biblioteca de tabela React poderosa e personalizável, construída com TypeScript, TanStack Table e SimplerBar.

## Instalação

```bash
npm i @dnotrever2/super-table
```

## Uso Básico

```tsx
import { Table } from '@dnotrever2/super-table';
import '@dnotrever2/super-table/super-table.css';
import type { Columns } from '@dnotrever2/super-table';

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

  return <Table header={columns} data={data} />;
}
```

## Props do Componente `Table`

### Props Obrigatórias

| Prop | Tipo | Descrição |
|------|------|-----------|
| `header` | `Columns<T>[]` | Array de definições de colunas |
| `data` | `T[]` | Array de dados a serem exibidos |

### Props Opcionais

#### Layout e Estilo

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `tableHeight` | `string` | `'400px'` | Altura da tabela |
| `defaultTextAlign` | `'left' \| 'center' \| 'right'` | `'left'` | Alinhamento padrão do texto |
| `stripedRows` | `boolean` | `false` | Ativa linhas zebradas |
| `hoverableRow` | `boolean` | `false` | Ativa hover nas linhas |
| `borders` | `'full' \| 'simple' \| 'none'` | `'full'` | Estilo das bordas |
| `style` | `'default' \| 'hannah'` | `'default'` | Tema de estilo |
| `footer` | `ReactNode` | - | Rodapé customizado externo |

#### Funcionalidades de Coluna

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `resizableCol` | `boolean` | `false` | Permite redimensionar colunas |
| `reorderableCol` | `boolean` | `false` | Permite reordenar colunas |
| `sortableCol` | `boolean` | `true` | Habilita ordenação de colunas |
| `onSortChange` | `(sort: SortState \| null) => void` | - | Callback quando a ordenação muda |

#### Edição

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `editable` | `boolean` | `false` | Permite edição inline (duplo clique) |
| `onDataChange` | `(data: T[]) => void` | - | Callback quando os dados são alterados |

#### Drag and Drop de Linhas

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `draggable` | `boolean` | `false` | Adiciona coluna para arrastar linhas |
| `draggableSticky` | `boolean` | `false` | Torna a coluna de drag sticky |

#### Seleção de Linhas

| Prop | Tipo | Descrição |
|------|------|-----------|
| `selectable` | `SelectableProps` | Configurações de seleção |

```typescript
interface SelectableProps {
  label?: string;                           // Label do checkbox no header
  sticky?: boolean;                         // Torna a coluna sticky
  disableSelectRow?: (string | number)[];   // IDs das linhas desabilitadas
  initialSelectRow?: (string | number)[];   // IDs das linhas inicialmente selecionadas
  hideDisabledSelects?: boolean;            // Oculta checkboxes desabilitados
  onSelectedRowsChange?: (ids: (string | number)[]) => void; // Callback de mudança
}
```

#### Expansão de Linhas

| Prop | Tipo | Descrição |
|------|------|-----------|
| `expandable` | `ExpandableProps<T>` | Configurações de expansão |

```typescript
interface ExpandableProps<T> {
  content?: (row: T) => ReactNode;  // Conteúdo expandido (nível tabela)
  clickRow?: boolean;               // Expande ao clicar na linha
  sticky?: boolean;                 // Torna a coluna de expansão sticky
  expandAllButton?: boolean;        // Mostra botão expandir/recolher tudo
}
```

#### Paginação

| Prop | Tipo | Descrição |
|------|------|-----------|
| `pagination` | `PaginationProps` | Configurações de paginação |

```typescript
interface PaginationProps {
  currentPage: number;              // Página atual
  totalItems: number;               // Total de itens
  pageSize: number;                 // Itens por página
  pageSizeOptions?: number[];       // Opções de tamanho de página
  onPageChange: (page: number, pageSize: number) => void; // Callback
}
```

#### Estados de Loading

| Prop | Tipo | Descrição |
|------|------|-----------|
| `loading` | `'default' \| 'spinner' \| 'placeholder' \| 'custom'` | Tipo de loading |
| `loadingCustom` | `ReactNode` | Componente customizado de loading |

#### Mensagens e Eventos

| Prop | Tipo | Descrição |
|------|------|-----------|
| `noResultMessage` | `ReactNode` | Mensagem quando não há dados |
| `onRowClick` | `(row: T) => void` | Callback ao clicar em uma linha |

## Props das Colunas (ColumnDef)

Além das props padrão do TanStack Table, o SuperTable adiciona as seguintes no objeto `meta`:

```typescript
interface ColumnMeta<TData, TValue> {
  widthSize?: string;               // Largura da coluna (ex: '120px', '15%')
  internalHeader?: ReactNode | (() => ReactNode);  // Header interno
  internalFooter?: ReactNode | (() => ReactNode);  // Footer interno
  resizable?: boolean;              // Permite redimensionamento
  reorderable?: boolean;            // Permite reordenação
  sortable?: boolean;               // Permite ordenação
  sticky?: 'left' | 'right';        // Fixa a coluna
  textAlign?: 'left' | 'center' | 'right';  // Alinhamento do texto
  expandable?: {                    // Configuração de expansão por coluna
    content: (row: TData) => ReactNode;
  };
}
```

### Exemplo de Coluna com Meta

```tsx
{
  accessorKey: 'name',
  header: 'Nome',
  meta: {
    widthSize: '200px',
    sticky: 'left',
    textAlign: 'center',
    sortable: false,
    resizable: false,
    internalHeader: 'Filtro de Nome',
    expandable: {
      content: (row) => <div>Detalhes: {row.name}</div>
    }
  }
}
```

## Exemplo Completo

```tsx
import { useState, useEffect } from 'react';
import { Table } from '@dnotrever2/super-table';
import '@dnotrever2/super-table/super-table.css';
import type { Columns, SortState } from '@dnotrever2/super-table';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  city: string;
}

export default function App() {
  // Estados
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [totalItems, setTotalItems] = useState(0);
  const [sort, setSort] = useState<SortState | null>(null);

  // Definição de colunas
  const columns: Columns<User>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      meta: {
        widthSize: '80px',
        sticky: 'left',
        resizable: false,
        textAlign: 'center',
      },
    },
    {
      accessorKey: 'name',
      header: 'Nome',
      meta: {
        widthSize: '200px',
        internalHeader: () => (
          <input 
            type="text" 
            placeholder="Filtrar nome..."
            style={{ width: '100%' }}
          />
        ),
        expandable: {
          content: (row) => (
            <div style={{ padding: '10px' }}>
              <strong>Informações de {row.name}</strong>
              <p>E-mail: {row.email}</p>
              <p>Idade: {row.age}</p>
              <p>Cidade: {row.city}</p>
            </div>
          ),
        },
      },
    },
    {
      accessorKey: 'email',
      header: 'E-mail',
      meta: {
        widthSize: '250px',
      },
    },
    {
      accessorKey: 'age',
      header: 'Idade',
      meta: {
        widthSize: '100px',
        textAlign: 'center',
      },
    },
    {
      accessorKey: 'city',
      header: 'Cidade',
      meta: {
        widthSize: '180px',
        sticky: 'right',
      },
      cell: ({ row }) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            alert(`Ver detalhes de ${row.original.city}`);
          }}
          style={{
            padding: '4px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {row.original.city}
        </button>
      ),
    },
  ];

  // Carregar dados
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulação de API
        const response = await fetch(
          `/api/users?page=${currentPage}&pageSize=${pageSize}` +
          `${sort ? `&sortColumn=${sort.columnId}&sortDirection=${sort.direction}` : ''}`
        );
        const result = await response.json();
        
        setData(result.data);
        setTotalItems(result.total);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, pageSize, sort]);

  // Handler de paginação
  const handlePageChange = (page: number, newPageSize: number) => {
    setCurrentPage(page);
    setPageSize(newPageSize);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gerenciamento de Usuários</h1>
      
      <Table
        // Dados
        header={columns}
        data={data}
        
        // Layout
        tableHeight="calc(100vh - 200px)"
        defaultTextAlign="left"
        stripedRows
        hoverableRow
        borders="simple"
        style="hannah"
        
        // Funcionalidades de coluna
        resizableCol
        reorderableCol
        sortableCol
        onSortChange={setSort}
        
        // Edição
        editable
        onDataChange={setData}
        
        // Drag and drop
        draggable
        draggableSticky
        
        // Seleção
        selectable={{
          sticky: true,
          label: 'Selecionar',
          disableSelectRow: [2, 4],
          onSelectedRowsChange: (ids) => {
            console.log('Linhas selecionadas:', ids);
          },
        }}
        
        // Expansão
        expandable={{
          sticky: true,
          clickRow: true,
          expandAllButton: true,
        }}
        
        // Paginação
        pagination={{
          currentPage,
          pageSize,
          totalItems,
          pageSizeOptions: [15, 30, 60, 120],
          onPageChange: handlePageChange,
        }}
        
        // Loading
        loading={loading ? 'spinner' : undefined}
        
        // Mensagens
        noResultMessage={
          <div style={{ padding: '20px', textAlign: 'center' }}>
            Nenhum usuário encontrado.
          </div>
        }
        
        // Eventos
        onRowClick={(row) => {
          console.log('Linha clicada:', row);
        }}
        
        // Footer
        footer={
          <div style={{ padding: '10px', textAlign: 'center' }}>
            © 2024 Minha Empresa - Todos os direitos reservados
          </div>
        }
      />
    </div>
  );
}
```

## Temas e Estilos

### Tema Padrão

```tsx
<Table
  header={columns}
  data={data}
  borders="full"
  style="default"
/>
```

### Tema Hannah

```tsx
<Table
  header={columns}
  data={data}
  borders="simple"
  style="hannah"
/>
```

## Notas Importantes

1. **IDs Únicos**: Para funcionalidades como seleção e expansão, certifique-se de que seus dados tenham um campo `id` único, ou forneça um `id` explícito nas definições de coluna.

2. **Paginação Server-Side**: A paginação é controlada externamente. Você é responsável por buscar os dados corretos com base em `currentPage` e `pageSize`.

3. **Ordenação Server-Side**: Similar à paginação, a ordenação não é feita automaticamente. Use o callback `onSortChange` para implementar ordenação no servidor.

4. **Performance**: Para grandes conjuntos de dados, use paginação e considere virtualização se necessário.

5. **Colunas Sticky**: Colunas fixas funcionam melhor com larguras definidas em pixels.

## Licença

Este projeto está sob a licença MIT.
