interface PaginationProps {
    currentPage: number;
    totalItems: number;
    pageSize: number;
    pageSizeOptions?: number[];
    onPageChange: (page: number, pageSize: number) => void;
}
export declare function Pagination({ currentPage, totalItems, pageSize, pageSizeOptions, onPageChange, }: PaginationProps): import("react/jsx-runtime").JSX.Element;
export {};
