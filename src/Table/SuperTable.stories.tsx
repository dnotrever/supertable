import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { SuperTable } from './Table';
import type { Columns, ReorderableColIconPosition, SortState } from './Table.types';

interface DemoUser {
    id: number;
    name: string;
    email: string;
    team: string;
    status: 'Ativo' | 'Pendente' | 'Bloqueado';
    city: string;
    progress: number;
}

type TableStoryArgs = {
    tableHeight: string;
    defaultTextAlign: 'left' | 'center' | 'right';
    resizableCol: boolean;
    reorderableCol: boolean;
    reorderableColIconPosition: ReorderableColIconPosition;
    sortableCol: boolean;
    editable: boolean;
    draggable: boolean;
    selectable: boolean;
    expandable: boolean;
    pagination: boolean;
    stripedRows: boolean;
    hoverableRow: boolean;
    borders: 'full' | 'simple' | 'none';
    style: 'default' | 'hannah';
};

const booleanControl = {
    control: 'boolean',
    table: {
        type: { summary: 'boolean' },
    },
} as const;

const users: DemoUser[] = Array.from({ length: 36 }, (_, index) => {
    const id = index + 1;
    const teams = ['Produto', 'Design', 'Engenharia', 'Suporte'];
    const statuses: DemoUser['status'][] = ['Ativo', 'Pendente', 'Bloqueado'];

    return {
        id,
        name: `Pessoa ${id}`,
        email: `pessoa.${id}@example.com`,
        team: teams[index % teams.length],
        status: statuses[index % statuses.length],
        city: ['Sao Paulo', 'Curitiba', 'Recife', 'Porto Alegre'][index % 4],
        progress: 25 + ((index * 13) % 75),
    };
});

const statusColors: Record<DemoUser['status'], string> = {
    Ativo: '#166534',
    Pendente: '#92400e',
    Bloqueado: '#991b1b',
};

const columns: Columns<DemoUser>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        meta: {
            widthSize: '64px',
            resizable: false,
            reorderable: false,
            sortable: false,
            textAlign: 'center',
        },
    },
    {
        accessorKey: 'name',
        header: 'Nome',
        meta: {
            widthSize: '220px',
            expandable: {
                content: row => (
                    <div style={{ padding: 8 }}>
                        Detalhes rapidos de {row.name}, do time {row.team}.
                    </div>
                ),
            },
        },
    },
    {
        accessorKey: 'email',
        header: 'E-mail',
        meta: {
            widthSize: '280px',
        },
    },
    {
        accessorKey: 'team',
        header: 'Time',
        meta: {
            widthSize: '160px',
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        meta: {
            widthSize: '160px',
        },
        cell: ({ row }) => (
            <span style={{ color: statusColors[row.original.status], fontWeight: 700 }}>
                {row.original.status}
            </span>
        ),
    },
    {
        accessorKey: 'city',
        header: 'Cidade',
        meta: {
            widthSize: '180px',
        },
    },
    {
        accessorKey: 'progress',
        header: 'Progresso',
        meta: {
            widthSize: '180px',
            internalFooter: () => (
                <span style={{ color: '#166534', fontWeight: 700 }}>
                    Media: 62%
                </span>
            ),
        },
        cell: ({ row }) => `${row.original.progress}%`,
    },
];

function sortData(data: DemoUser[], sort: SortState | null) {
    if (!sort) return data;

    return [...data].sort((a, b) => {
        const aValue = a[sort.columnId as keyof DemoUser];
        const bValue = b[sort.columnId as keyof DemoUser];
        const direction = sort.direction === 'asc' ? 1 : -1;

        return String(aValue).localeCompare(String(bValue), 'pt-BR', { numeric: true }) * direction;
    });
}

function TableScenario(args: TableStoryArgs) {
    const [sort, setSort] = useState<SortState | null>(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedRows, setSelectedRows] = useState<(string | number)[]>([1, 3]);

    const sortedUsers = useMemo(() => sortData(users, sort), [sort]);
    const visibleUsers = useMemo(() => {
        if (!args.pagination) return sortedUsers;

        const start = (page - 1) * pageSize;
        return sortedUsers.slice(start, start + pageSize);
    }, [args.pagination, page, pageSize, sortedUsers]);

    return (
        <div style={{ maxWidth: 1180 }}>
            <SuperTable
                id="storybook-super-table"
                header={columns}
                data={visibleUsers}
                footer={<div style={{ padding: '6px 0' }}>Footer externo da story</div>}
                tableHeight={args.tableHeight}
                defaultTextAlign={args.defaultTextAlign}
                resizableCol={args.resizableCol}
                reorderableCol={args.reorderableCol}
                reorderableColIconPosition={args.reorderableColIconPosition}
                sortableCol={args.sortableCol}
                editable={args.editable}
                draggable={args.draggable}
                selectable={
                    args.selectable
                        ? {
                            sticky: true,
                            label: 'Selecionar',
                            disableSelectRow: [2, 4],
                            initialSelectRow: selectedRows,
                            onSelectedRowsChange: setSelectedRows,
                        }
                        : undefined
                }
                expandable={
                    args.expandable
                        ? {
                            sticky: true,
                            clickRow: true,
                            expandAllButton: true,
                            content: row => (
                                <div style={{ padding: '10px 14px' }}>
                                    {row.name} trabalha em {row.team} e esta com {row.progress}% de progresso.
                                </div>
                            ),
                        }
                        : undefined
                }
                pagination={
                    args.pagination
                        ? {
                            currentPage: page,
                            pageSize,
                            totalItems: sortedUsers.length,
                            pageSizeOptions: [5, 10, 20],
                            onPageChange: (nextPage, nextPageSize) => {
                                setPage(nextPage);
                                setPageSize(nextPageSize);
                            },
                        }
                        : undefined
                }
                onSortChange={setSort}
                stripedRows={args.stripedRows}
                hoverableRow={args.hoverableRow}
                borders={args.borders}
                style={args.style}
            />

            {args.selectable && (
                <div style={{ marginTop: 12, fontSize: 13, color: '#4b5563' }}>
                    Selecionados: {selectedRows.join(', ') || 'nenhum'}
                </div>
            )}
        </div>
    );
}

const meta = {
    title: 'Components/SuperTable',
    component: SuperTable,
    args: {
        tableHeight: '520px',
        defaultTextAlign: 'left',
        resizableCol: true,
        reorderableCol: true,
        reorderableColIconPosition: 'right',
        sortableCol: true,
        editable: false,
        draggable: false,
        selectable: false,
        expandable: false,
        pagination: true,
        stripedRows: true,
        hoverableRow: true,
        borders: 'simple',
        style: 'default',
    },
    argTypes: {
        tableHeight: { control: 'text' },
        resizableCol: booleanControl,
        reorderableCol: booleanControl,
        reorderableColIconPosition: {
            control: 'select',
            options: ['left', 'right'],
        },
        sortableCol: booleanControl,
        editable: booleanControl,
        draggable: booleanControl,
        selectable: booleanControl,
        expandable: booleanControl,
        pagination: booleanControl,
        stripedRows: booleanControl,
        hoverableRow: booleanControl,
        defaultTextAlign: {
            control: 'select',
            options: ['left', 'center', 'right'],
        },
        borders: {
            control: 'select',
            options: ['full', 'simple', 'none'],
        },
        style: {
            control: 'select',
            options: ['default', 'hannah'],
        },
    },
    render: args => <TableScenario {...args} />,
} satisfies Meta<TableStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
