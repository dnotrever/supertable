interface Args {
    setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
}
export declare function useColumnReorderGhost({ setColumnOrder }: Args): {
    startDrag: (columnId: string, e: PointerEvent) => void;
};
export {};
