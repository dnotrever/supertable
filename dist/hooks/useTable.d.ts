import type { Columns } from '../Table/Table.types';
export declare function useTable<T>(colunas: Columns<T>[], data: T[], columnOrder: string[], setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>): import("@tanstack/table-core").Table<T>;
