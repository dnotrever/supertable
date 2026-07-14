import { useMemo } from 'react';
import type { Table } from '@tanstack/react-table';
import { parseSize } from '../utils/parseSize';

export type StickySide = 'left' | 'right';

export interface StickyInfo {
    side: StickySide;
    offset: number;
    zIndex: number;
}

export function useStickyColumns<T>(table: Table<T>) {

    const columnOrder = table.getState().columnOrder;

    return useMemo(() => {

        const cols = table.getVisibleLeafColumns();

        const widthPxById = new Map<string, number>();

        for (const c of cols) {
            widthPxById.set(c.id, parseSize(c.columnDef.meta?.widthSize));
        }

        const stickyById = new Map<string, StickyInfo>();

        let left = 0;

        for (const c of cols) {
            if (c.columnDef.meta?.sticky === 'left') {
                stickyById.set(c.id, { side: 'left', offset: left, zIndex: 20 });
                left += widthPxById.get(c.id) ?? 0;
            }
        }

        let right = 0;

        for (let i = cols.length - 1; i >= 0; i--) {
            const c = cols[i];
            if (c.columnDef.meta?.sticky === 'right') {
                stickyById.set(c.id, { side: 'right', offset: right, zIndex: 20 });
                right += widthPxById.get(c.id) ?? 0;
            }
        }

        return stickyById;

    }, [table, columnOrder]);

}
