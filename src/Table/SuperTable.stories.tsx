import { useCallback, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { SuperTable } from './Table';
import type { Columns, LoadingType, ReorderableColIconPosition, SortState } from './Table.types';

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
    showFooter: boolean;
    footerText: string;
    emptyData: boolean;
    defaultTextAlign: 'left' | 'center' | 'right';
    resizableCol: boolean;
    reorderableCol: boolean;
    reorderableColIconPosition: ReorderableColIconPosition;
    sortableCol: boolean;
    editable: boolean;
    draggable: boolean;
    draggableSticky: boolean;
    selectable: boolean;
    selectableSticky: boolean;
    selectableShowLabel: boolean;
    selectableLabel: string;
    selectableHideDisabledSelects: boolean;
    selectableRevealOnHover: boolean;
    selectableDisabledRows: string;
    expandable: boolean;
    expandableSticky: boolean;
    expandableClickRow: boolean;
    expandableExpandAllButton: boolean;
    pagination: boolean;
    paginationPageSizeOptions: string;
    paginationCustomInfo: boolean;
    loading: 'none' | LoadingType;
    loadingCustomText: string;
    noResultMessage: string;
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

const initialSelectedRows: (string | number)[] = [1, 3];

function areArraysEqual<T>(a: T[], b: T[]) {
    if (a.length !== b.length) return false;
    return a.every((value, index) => Object.is(value, b[index]));
}

function parseNumberList(value: string) {
    return value
        .split(',')
        .map(item => Number(item.trim()))
        .filter(item => Number.isFinite(item));
}

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
    const [selectedRows, setSelectedRows] = useState<(string | number)[]>(initialSelectedRows);
    const handleSelectedRowsChange = useCallback((next: (string | number)[]) => {
        setSelectedRows(prev => areArraysEqual(prev, next) ? prev : next);
    }, []);

    const sortedUsers = useMemo(() => sortData(users, sort), [sort]);
    const visibleUsers = useMemo(() => {
        if (!args.pagination) return sortedUsers;

        const start = (page - 1) * pageSize;
        return sortedUsers.slice(start, start + pageSize);
    }, [args.pagination, page, pageSize, sortedUsers]);

    const pageSizeOptions = useMemo(
        () => {
            const parsed = parseNumberList(args.paginationPageSizeOptions);
            return parsed.length > 0 ? parsed : [5, 10, 20];
        },
        [args.paginationPageSizeOptions]
    );

    const disabledSelectRows = useMemo(
        () => parseNumberList(args.selectableDisabledRows),
        [args.selectableDisabledRows]
    );

    const selectableProps = useMemo(
        () => args.selectable
            ? {
                sticky: args.selectableSticky,
                label: args.selectableShowLabel ? args.selectableLabel : undefined,
                disableSelectRow: disabledSelectRows,
                initialSelectRow: initialSelectedRows,
                hideDisabledSelects: args.selectableHideDisabledSelects,
                revealOnHover: args.selectableRevealOnHover,
                onSelectedRowsChange: handleSelectedRowsChange,
            }
            : undefined,
        [
            args.selectable,
            args.selectableSticky,
            args.selectableShowLabel,
            args.selectableLabel,
            args.selectableHideDisabledSelects,
            args.selectableRevealOnHover,
            disabledSelectRows,
            handleSelectedRowsChange,
        ]
    );

    const expandableProps = useMemo(
        () => args.expandable
            ? {
                sticky: args.expandableSticky,
                clickRow: args.expandableClickRow,
                expandAllButton: args.expandableExpandAllButton,
                content: (row: DemoUser) => (
                    <div style={{ padding: '10px 14px' }}>
                        {row.name} trabalha em {row.team} e esta com {row.progress}% de progresso.
                    </div>
                ),
            }
            : undefined,
        [
            args.expandable,
            args.expandableSticky,
            args.expandableClickRow,
            args.expandableExpandAllButton,
        ]
    );

    const tableData = args.emptyData ? [] : visibleUsers;
    const totalItems = args.emptyData ? 0 : sortedUsers.length;
    const loading = args.loading === 'none' ? undefined : args.loading;

    return (
        <div style={{ maxWidth: 1180 }}>
            <SuperTable
                id="storybook-super-table"
                header={columns}
                data={tableData}
                footer={args.showFooter ? <div style={{ padding: '6px 0' }}>{args.footerText}</div> : undefined}
                tableHeight={args.tableHeight}
                defaultTextAlign={args.defaultTextAlign}
                resizableCol={args.resizableCol}
                reorderableCol={args.reorderableCol}
                reorderableColIconPosition={args.reorderableColIconPosition}
                sortableCol={args.sortableCol}
                editable={args.editable}
                draggable={args.draggable}
                draggableSticky={args.draggableSticky}
                selectable={selectableProps}
                expandable={expandableProps}
                pagination={
                    args.pagination
                        ? {
                            currentPage: page,
                            pageSize,
                            totalItems,
                            pageSizeOptions,
                            onPageChange: (nextPage, nextPageSize) => {
                                setPage(nextPage);
                                setPageSize(nextPageSize);
                            },
                            renderInfo: args.paginationCustomInfo
                                ? ctx => `${ctx.startItem}-${ctx.endItem} / ${ctx.totalItems} registros`
                                : undefined,
                        }
                        : undefined
                }
                onSortChange={setSort}
                loading={loading}
                loadingCustom={<span>{args.loadingCustomText}</span>}
                noResultMessage={args.noResultMessage}
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
        showFooter: true,
        footerText: 'Footer externo da story',
        emptyData: false,
        defaultTextAlign: 'left',
        resizableCol: true,
        reorderableCol: true,
        reorderableColIconPosition: 'right',
        sortableCol: true,
        editable: false,
        draggable: false,
        draggableSticky: false,
        selectable: false,
        selectableSticky: true,
        selectableShowLabel: true,
        selectableLabel: 'Selecionar',
        selectableHideDisabledSelects: false,
        selectableRevealOnHover: false,
        selectableDisabledRows: '2, 4',
        expandable: false,
        expandableSticky: true,
        expandableClickRow: true,
        expandableExpandAllButton: true,
        pagination: true,
        paginationPageSizeOptions: '5, 10, 20',
        paginationCustomInfo: false,
        loading: 'none',
        loadingCustomText: 'Carregando do meu jeito...',
        noResultMessage: 'Nenhum resultado encontrado.',
        stripedRows: true,
        hoverableRow: true,
        borders: 'simple',
        style: 'default',
    },
    argTypes: {
        tableHeight: { control: 'text' },
        showFooter: booleanControl,
        footerText: { control: 'text' },
        emptyData: booleanControl,
        resizableCol: booleanControl,
        reorderableCol: booleanControl,
        reorderableColIconPosition: {
            control: 'select',
            options: ['left', 'right'],
        },
        sortableCol: booleanControl,
        editable: booleanControl,
        draggable: booleanControl,
        draggableSticky: booleanControl,
        selectable: booleanControl,
        selectableSticky: booleanControl,
        selectableShowLabel: booleanControl,
        selectableLabel: { control: 'text' },
        selectableHideDisabledSelects: booleanControl,
        selectableRevealOnHover: booleanControl,
        selectableDisabledRows: { control: 'text' },
        expandable: booleanControl,
        expandableSticky: booleanControl,
        expandableClickRow: booleanControl,
        expandableExpandAllButton: booleanControl,
        pagination: booleanControl,
        paginationPageSizeOptions: { control: 'text' },
        paginationCustomInfo: booleanControl,
        loading: {
            control: 'select',
            options: ['none', 'default', 'spinner', 'placeholder', 'custom'],
        },
        loadingCustomText: { control: 'text' },
        noResultMessage: { control: 'text' },
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
