export declare function useHorizontalScrollSync(): {
    bodyRef: import("react").RefObject<HTMLDivElement | null>;
    registerSyncElement: (el: HTMLElement | null) => void;
    onBodyScroll: () => void;
};
