interface Args<T> {
    setData: React.Dispatch<React.SetStateAction<T[]>>;
    enabled?: boolean;
}
export declare function useRowReorder<T>({ setData, enabled }: Args<T>): {
    draggingIndex: number | null;
    onDragStart: (e: React.DragEvent<HTMLTableRowElement>, index: number) => void;
    onDragOver: (e: React.DragEvent<HTMLTableRowElement>, overIndex: number) => void;
    onDrop: () => void;
    onDragEnd: () => void;
};
export {};
