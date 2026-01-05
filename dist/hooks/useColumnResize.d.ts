import type { Column } from '@tanstack/react-table';
interface ResizeArgs {
    onResize: (columnId: string, width: number) => void;
    onResizeEnd?: () => void;
    minWidth?: number;
}
export declare function useColumnResize<T>({ onResize, onResizeEnd, minWidth, }: ResizeArgs): {
    startResize: (e: React.MouseEvent, column: Column<T, unknown>) => void;
};
export {};
