import type { ReactNode } from 'react';
import type { Table } from '@tanstack/react-table';
interface Props<T> {
    table: Table<T>;
    children?: ReactNode;
}
export declare function ExternalFooter<T>({ children }: Props<T>): import("react/jsx-runtime").JSX.Element;
export {};
