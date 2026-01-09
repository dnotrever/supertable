interface PaginationProps {
    currentPage: number;
    totalItems: number;
    pageSize: number;
    pageSizeOptions?: number[];
    onPageChange: (page: number, pageSize: number) => void;
    customPageSizeSelect?: (props: {
        pageSize: number;
        pageSizeOptions: number[];
        onPageSizeChange: (newSize: number) => void;
    }) => React.ReactNode;
}
export declare function Pagination({ currentPage, totalItems, pageSize, pageSizeOptions, onPageChange, customPageSizeSelect, }: PaginationProps): import("react/jsx-runtime").JSX.Element;
export {};
