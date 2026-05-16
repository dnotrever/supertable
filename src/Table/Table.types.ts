import type { ColumnDef } from '@tanstack/react-table';
import type { ReactNode } from 'react';

export type RenderNode =
    | ReactNode
    | (() => ReactNode);

export type Columns<T> = ColumnDef<T, unknown>;

export type LoadingType = 'default' | 'spinner' | 'placeholder' | 'custom';

export interface SelectableProps {
    label?: string;
    sticky?: boolean;
    disableSelectRow?: (string | number)[];
    initialSelectRow?: (string | number)[];
    hideDisabledSelects?: boolean;
    revealOnHover?: boolean;
    onSelectedRowsChange?: (ids: (string | number)[]) => void;
}

export interface ExpandableProps<T> {
    content?: (row: T) => ReactNode;
    clickRow?: boolean;
    sticky?: boolean;
    expandAllButton?: boolean;
}

export interface SuperTableProps<T> {
    id?: string;
    header: Columns<T>[];
    data: T[];
    footer?: ReactNode;
    tableHeight?: string;
    resizableCol?: boolean;
    reorderableCol?: boolean;
    defaultTextAlign?: 'left' | 'center' | 'right';
    editable?: boolean;
    draggable?: boolean;
    draggableSticky?: boolean;
    selectable?: SelectableProps;
    expandable?: ExpandableProps<T>;
    pagination?: PaginationProps;
    sortableCol?: boolean;
    onSortChange?: (sort: SortState | null) => void;
    onDataChange?: (data: T[]) => void;
    loading?: LoadingType;
    loadingCustom?: ReactNode;
    noResultMessage?: ReactNode;
    onRowClick?: (row: T) => void;
    stripedRows?: boolean;
    hoverableRow?: boolean;
    borders?: 'full' | 'simple' | 'none';
    style?: 'default' | 'hannah';
}

export interface PaginationProps {
    currentPage: number;
    totalItems: number;
    pageSize: number;
    initialPageSize?: number;
    pageSizeOptions?: number[];
    onPageChange: (page: number, pageSize: number) => void;
}

export interface SortState {
    columnId: string;
    direction: 'asc' | 'desc';
}