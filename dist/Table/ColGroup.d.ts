import type { Table } from '@tanstack/react-table';
interface Props<T> {
    table: Table<T>;
    tableWidth: number;
}
export declare function ColGroup<T>({ table, tableWidth }: Props<T>): import("react/jsx-runtime").JSX.Element;
export {};
