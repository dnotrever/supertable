import type { ReactNode } from 'react';
interface PaginationInfoContext {
    totalItems: number;
    displayedItems: number;
    startItem: number;
    endItem: number;
    pageSize: number;
}
interface PaginationProps {
    currentPage: number;
    totalItems: number;
    pageSize: number;
    pageSizeOptions?: number[];
    onPageChange: (page: number, pageSize: number) => void;
    renderInfo?: (ctx: PaginationInfoContext) => ReactNode;
}
export declare function Pagination({ currentPage, totalItems, pageSize, pageSizeOptions, onPageChange, renderInfo, }: PaginationProps): import("react/jsx-runtime").JSX.Element;
export {};
