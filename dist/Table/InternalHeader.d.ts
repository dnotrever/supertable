import type { Table } from '@tanstack/react-table';
import type { StickyInfo } from '../hooks/useStickyColumns';
interface Props<T> {
    table: Table<T>;
    tableWidth: number;
    stickyById: Map<string, StickyInfo>;
    defaultTextAlign: 'left' | 'center' | 'right';
    scrollRef?: (el: HTMLElement | null) => void;
}
export declare function InternalHeader<T>({ table, tableWidth, stickyById, defaultTextAlign, scrollRef, }: Props<T>): import("react/jsx-runtime").JSX.Element | null;
export {};
