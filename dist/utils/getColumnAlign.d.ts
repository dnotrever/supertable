import type { Column } from '@tanstack/react-table';
export declare function getColumnAlign<T>(column: Column<T, unknown>, defaultTextAlign: 'left' | 'center' | 'right'): "left" | "right" | "center";
