import { useRef, useCallback } from 'react';

interface Args {
    setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
}

type HeaderInfo = {
    id: string;
    left: number;
    right: number;
};

type DropTarget = {
    id: string;
    side: 'left' | 'right';
};

export function useColumnReorderGhost({ setColumnOrder }: Args) {

    const draggingId = useRef<string | null>(null);
    const ghostEl = useRef<HTMLElement | null>(null);
    const originTh = useRef<HTMLElement | null>(null);
    const indicatorEl = useRef<HTMLElement | null>(null);

    const rafId = useRef<number | null>(null);
    const lastPointerX = useRef<number>(0);
    const lastPointerY = useRef<number>(0);

    const headersCache = useRef<HeaderInfo[]>([]);

    const onPointerMove = useRef<(e: PointerEvent) => void>(() => { });
    const onPointerUp = useRef<() => void>(() => { });

    const readHeaders = useCallback(() => {
        const ths = Array.from(
            document.querySelectorAll<HTMLElement>('th[data-col-id]')
        );

        headersCache.current = ths
            .filter(th => th.dataset.reorderable !== 'false')
            .map(th => {
                const r = th.getBoundingClientRect();
                return {
                    id: th.dataset.colId!,
                    left: r.left,
                    right: r.right,
                };
            })
            .sort((a, b) => a.left - b.left);
    }, []);

    const createGhost = useCallback((th: HTMLElement, startX: number, startY: number) => {
        const thRect = th.getBoundingClientRect();

        let wrapper: HTMLElement | null = th.parentElement;
        while (wrapper && !wrapper.classList.contains('super-table-wrapper')) {
            wrapper = wrapper.parentElement;
        }

        const internalFooter = wrapper?.querySelector<HTMLElement>('.table-internal-footer');
        const internalTable = wrapper?.querySelector<HTMLElement>('.internal-table');
        const bottomEl = internalFooter ?? internalTable;
        const bottom = bottomEl ? bottomEl.getBoundingClientRect().bottom : thRect.bottom;
        const fullHeight = bottom - thRect.top;

        const ghost = document.createElement('div');
        ghost.classList.add('table-col-ghost');

        const computed = window.getComputedStyle(th);

        const headerEl = document.createElement('div');
        headerEl.classList.add('table-col-ghost-header');
        headerEl.style.height = `${thRect.height}px`;
        headerEl.style.fontFamily = computed.fontFamily;
        headerEl.style.fontSize = computed.fontSize;
        headerEl.style.fontWeight = computed.fontWeight;
        headerEl.style.fontStyle = computed.fontStyle;
        headerEl.style.letterSpacing = computed.letterSpacing;
        headerEl.style.color = computed.color;
        headerEl.innerHTML = th.innerHTML;
        ghost.appendChild(headerEl);

        ghost.style.position = 'fixed';
        ghost.style.left = `${startX}px`;
        ghost.style.top = `${startY}px`;
        ghost.style.width = `${thRect.width}px`;
        ghost.style.height = `${fullHeight}px`;
        ghost.style.pointerEvents = 'none';
        ghost.style.zIndex = '9999';
        ghost.style.willChange = 'left, top';
        ghost.style.transition = 'none';

        document.body.appendChild(ghost);
        return ghost;
    }, []);

    const createIndicator = useCallback(() => {
        const el = document.createElement('div');
        el.className = 'table-col-drop-indicator';
        el.style.position = 'fixed';
        el.style.pointerEvents = 'none';
        el.style.zIndex = '10000';
        el.style.display = 'none';
        document.body.appendChild(el);
        return el;
    }, []);

    const updateIndicator = useCallback((target: DropTarget) => {
        const indicator = indicatorEl.current;
        if (!indicator) return;

        const overTh = document.querySelector<HTMLElement>(`th[data-col-id="${target.id}"]`);
        if (!overTh) {
            indicator.style.display = 'none';
            return;
        }

        const thRect = overTh.getBoundingClientRect();

        const top = thRect.top;

        let wrapper: HTMLElement | null = overTh.parentElement;
        while (wrapper && !wrapper.classList.contains('super-table-wrapper')) {
            wrapper = wrapper.parentElement;
        }

        const internalFooter = wrapper?.querySelector<HTMLElement>('.table-internal-footer');
        const internalTable = wrapper?.querySelector<HTMLElement>('.internal-table');
        const bottomEl = internalFooter ?? internalTable;
        const bottom = bottomEl ? bottomEl.getBoundingClientRect().bottom : thRect.bottom;

        indicator.style.display = 'block';
        indicator.style.top = `${top}px`;
        indicator.style.height = `${bottom - top}px`;
        indicator.style.left = target.side === 'left' ? `${thRect.left}px` : `${thRect.right}px`;
    }, []);

    const getDropTarget = useCallback((cursorX: number): DropTarget | null => {
        const draggingColumnId = draggingId.current;
        const headers = headersCache.current;
        if (!draggingColumnId || !headers.length) return null;

        const draggingIndex = headers.findIndex(h => h.id === draggingColumnId);
        if (draggingIndex === -1) return null;

        for (let index = 0; index < headers.length; index += 1) {
            const h = headers[index];
            if (h.id === draggingColumnId) continue;
            if (cursorX < h.left || cursorX > h.right) continue;

            const midpoint = h.left + (h.right - h.left) / 2;
            const isMovingRight = index > draggingIndex;
            const passedHalf = isMovingRight
                ? cursorX >= midpoint
                : cursorX <= midpoint;

            if (!passedHalf) return null;

            return {
                id: h.id,
                side: isMovingRight ? 'right' : 'left',
            };
        }

        return null;
    }, []);

    const startDrag = useCallback(
        (columnId: string, e: PointerEvent) => {
            draggingId.current = columnId;

            const th = document.querySelector<HTMLElement>(`th[data-col-id="${columnId}"]`);
            if (!th) return;

            originTh.current = th;

            ghostEl.current = createGhost(th, e.clientX, th.getBoundingClientRect().top);
            indicatorEl.current = createIndicator();

            th.classList.add('is-dragging-col');
            th.style.opacity = '0.2';

            readHeaders();

            lastPointerX.current = e.clientX;
            lastPointerY.current = e.clientY;
            document.body.style.cursor = 'grabbing';

            document.addEventListener('pointermove', onPointerMove.current);
            document.addEventListener('pointerup', onPointerUp.current);
        },
        [createGhost, createIndicator, readHeaders]
    );

    onPointerMove.current = (e: PointerEvent) => {
        if (!draggingId.current || !ghostEl.current) return;

        lastPointerX.current = e.clientX;
        lastPointerY.current = e.clientY;

        if (rafId.current) return;

        rafId.current = requestAnimationFrame(() => {
            rafId.current = null;

            if (!draggingId.current || !ghostEl.current) return;

            ghostEl.current.style.left = `${lastPointerX.current}px`;

            const dropTarget = getDropTarget(lastPointerX.current);

            if (dropTarget) {
                updateIndicator(dropTarget);
            } else if (indicatorEl.current) {
                indicatorEl.current.style.display = 'none';
            }

            if (!dropTarget || dropTarget.id === draggingId.current) return;

            setColumnOrder(prev => {
                const from = prev.indexOf(draggingId.current!);
                const to = prev.indexOf(dropTarget.id);
                if (from === -1 || to === -1 || from === to) return prev;

                const next = [...prev];
                next.splice(from, 1);
                next.splice(to, 0, draggingId.current!);
                return next;
            });

            requestAnimationFrame(() => {
                readHeaders();
            });
        });
    };

    onPointerUp.current = () => {
        if (rafId.current) {
            cancelAnimationFrame(rafId.current);
            rafId.current = null;
        }

        ghostEl.current?.remove();
        ghostEl.current = null;

        indicatorEl.current?.remove();
        indicatorEl.current = null;

        if (originTh.current) {
            originTh.current.classList.remove('is-dragging-col');
            originTh.current.style.opacity = '';
        }

        originTh.current = null;
        draggingId.current = null;
        lastPointerX.current = 0;
        lastPointerY.current = 0;
        headersCache.current = [];

        document.body.style.cursor = '';

        document.removeEventListener('pointermove', onPointerMove.current);
        document.removeEventListener('pointerup', onPointerUp.current);
    };

    return {
        startDrag,
    };

}
