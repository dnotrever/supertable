import type { Table, Column } from '@tanstack/react-table';
import type { StickyInfo } from '../hooks/useStickyColumns';
import type { SortState, SelectableProps, ExpandableProps } from './Table.types';
interface Props<T> {
    table: Table<T>;
    tableWidth: number;
    data: T[];
    stickyById: Map<string, StickyInfo>;
    resizableCol?: boolean;
    reorderableCol?: boolean;
    sortableCol?: boolean;
    sortState: SortState | null;
    setSortState: (next: SortState | null) => void;
    defaultTextAlign: 'left' | 'center' | 'right';
    selectable?: SelectableProps;
    selectedRows: Set<string | number>;
    disableSelectRow: (string | number)[];
    onDragStart?: (columnId: string, e: PointerEvent) => void;
    scrollRef?: (el: HTMLElement | null) => void;
    onResizeStart?: (e: React.MouseEvent, column: Column<T, unknown>) => void;
    setSelectedRows: React.Dispatch<React.SetStateAction<Set<string | number>>>;
    expandable?: ExpandableProps<T>;
    expandedRows: Set<string | number>;
    setExpandedRows: React.Dispatch<React.SetStateAction<Set<string | number>>>;
}
export declare function ExternalHeader<T>({ table, tableWidth, data, stickyById, resizableCol, reorderableCol, sortableCol, sortState, setSortState, defaultTextAlign, selectable, selectedRows, disableSelectRow, onDragStart, scrollRef, onResizeStart, setSelectedRows, expandable, expandedRows, setExpandedRows, }: Props<T>): import("react/jsx-runtime").JSX.Element;
export {};
