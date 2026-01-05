import type { Table } from '@tanstack/react-table';
export type StickySide = 'left' | 'right';
export interface StickyInfo {
    side: StickySide;
    offset: number;
    zIndex: number;
}
export declare function useStickyColumns<T>(table: Table<T>): Map<string, StickyInfo>;
