import { useEffect, useState } from 'react';

import type { Columns, SortState } from '../Table/Table.types';
import { SuperTable } from '../Table/Table';
import '../styles/Table.scss';
import 'simplebar-react/dist/simplebar.min.css';

import { getUsers, type User } from './api_test';

export default function App() {

    const colunas: Columns<User>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
            meta: {
                widthSize: '50px',
                // widthSize: '5%',
                // sticky: 'left',
                resizable: false,
                reorderable: false,
                sortable: false,
                textAlign: 'center'
            },
        },
        {
            accessorKey: 'coluna1',
            header: 'Coluna A',
            meta: {
                widthSize: '300px',
                // widthSize: '15%',
                // sticky: 'left',
                // internalHeader: 'Header Interno A',
                // internalFooter: 'Footer Interno A',
                expandable: {
                    content: (row: User) => (
                        <div>Detalhes de {row.coluna1}</div>
                    ),
                },
            },
        },
        {
            accessorKey: 'coluna2',
            header: 'Coluna B',
            meta: {
                widthSize: '300px',
                // widthSize: '15%',
            },
            cell: ({ row }) => {
                return (
                    <button
                        style={{ padding: '4px 12px', borderRadius: '4px', cursor: 'pointer' }}
                        onClick={(e) => {
                            e.stopPropagation();
                            alert(`Button: ${row.original.coluna1}`);
                        }}
                    >
                        Botão {row.original.coluna2}
                    </button>
                );
            },
        },
        {
            accessorKey: 'coluna3',
            header: 'Coluna C',
            meta: {
                widthSize: '300px',
                // widthSize: '15%',
                internalHeader: () => {
                    return (
                        <div style={{ color: 'red', fontWeight: 'bold' }}>
                            Header Interno Cust.
                        </div>
                    );
                },
                internalFooter: () => {
                    return (
                        <div style={{ color: 'green', fontWeight: 'bold' }}>
                            Footer Interno Cust.
                        </div>
                    );
                },
                expandable: {
                    content: (row: User) => (
                        <div>Detalhes de {row.coluna3}</div>
                    ),
                },
            },
        },
        {
            accessorKey: 'coluna4',
            // header: 'Coluna D',
            header: () => (
                <div style={{ color: 'goldenrod', fontWeight: 'bold' }}>
                    Coluna D Cust.
                </div>
            ),
            meta: {
                widthSize: '300px',
                // widthSize: '15%',
            },
            cell: ({ row }) => {
                const colB = row.original.coluna2;
                const clique = () => { alert(`Ancora: ${colB}`) }
                return (
                    <a style={{ color: 'blue' }} onClick={clique}>
                        {colB} Cust.
                    </a>
                );
            },
        },
        // {
        //     accessorKey: 'coluna6',
        //     // header: 'Coluna F',
        //     header: () => (
        //         <input type="text" style={{ height: '12px', padding: '8px 8px', borderRadius: '4px', border: '1px solid #aaa' }} />
        //     ),
        //     meta: {
        //         widthSize: '300px',
        //         // widthSize: '20%',
        //         // sticky: 'right',
        //         sortable: false,
        //         resizable: false,
        //         reorderable: false,
        //         // textAlign: 'center',
        //         // internalHeader: () => {
        //         //     return (
        //         //         <input type="text" style={{ height: '12px', padding: '8px 8px', borderRadius: '4px', border: '1px solid #aaa' }} />
        //         //     );
        //         // },
        //     },
        // },
    ];

    const rodape = (
        <div style={{ padding: '5px 0' }}>
            Footer Externo
        </div>
    );

    // States ====================================================================================

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [totalItems, setTotalItems] = useState(0);
    const [sort, setSort] = useState<SortState | null>(null);

    const [mostrarIgnorados, setMostrarIgnorados] = useState(false);

    useEffect(() => {
        setLoading(true);
        getUsers({
            page: currentPage,
            pageSize: pageSize,
            sortColumn: sort?.columnId,
            sortDirection: sort?.direction
        })
            .then(res => {
                setTotalItems(res.total);
                setUsers(res.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [currentPage, pageSize, sort]);

    const handlePageChange = (page: number, newPageSize: number) => {
        setCurrentPage(page);
        setPageSize(newPageSize);
    };

    // Reproduzir Exibição/Ocultação de Linhas Ignoradas ========================================================

    // const usersComIgnorados = users.map(user => ({
    //     ...user,
    //     eh_ignorado: user.id % 2 === 0,
    // }));

    // const usersFiltrados = mostrarIgnorados
    //     ? usersComIgnorados
    //     : usersComIgnorados.filter(user => !user.eh_ignorado);

    // const linhasIgnoradas = mostrarIgnorados
    //     ? usersComIgnorados
    //         .filter(user => user.eh_ignorado)
    //         .map(user => user.id)
    //     : [];

    // const handleIgnoradosChange = (ids: (string | number)[]) => {
    //     console.log('IDs ignorados pelo usuário:', ids);
    //     // Aqui você pode:
    //     // 1. Atualizar estado local
    //     // 2. Enviar para API
    //     // 3. Persistir no backend
    // };

    //===========================================================================================================

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px', fontFamily: 'Open Sans, sans-serif' }}>
            <div style={{ width: '90%' }}>

                <SuperTable

                    id='minha-tabela'

                    header={colunas}
                    data={users}
                    // data={usersFiltrados}
                    footer={rodape}

                    // onDataChange={setTableData}

                    tableHeight='calc(100vh - 220px)'
                    // defaultTextAlign='center'

                    resizableCol
                    reorderableCol

                    // sortableCol
                    // sortableCol={false}
                    onSortChange={setSort}

                    editable

                    draggable
                    // draggableSticky

                    selectable={{
                        // sticky: true,
                        // label: 'Selecionar',
                        disableSelectRow: [2, 4, 6, 8],
                        // hideDisabledSelects: true,
                        // initialSelectRow: [1, 3, 5]
                        // initialSelectRow: linhasIgnoradas,
                        // onSelectedRowsChange: handleIgnoradosChange,
                    }}

                    expandable={{
                        // sticky: true,
                        clickRow: true,
                        expandAllButton: true,
                        // content: (row: User) => (
                        //     <div>Detalhes de {row.coluna1}</div>
                        // ),
                    }}

                    pagination={{
                        currentPage,
                        pageSize,
                        totalItems,
                        pageSizeOptions: [15, 30, 60, 120],
                        onPageChange: handlePageChange,
                    }}

                    loading={loading ? 'spinner' : undefined}
                    // loadingCustom={
                    //     <div style={{ padding: '20px', textAlign: 'center', color: 'blue' }}>
                    //         Os dados estão sendo carregados...
                    //     </div>
                    // }

                    // noResultMessage={
                    //     <div style={{ padding: '20px', color: '#888', fontSize: '14px' }}>
                    //         Não há dados para exibir.
                    //     </div>
                    // }

                    // hoverableRow
                    // stripedRows
                    // borders='simple'
                    // borders='none'
                    style='hannah'

                    // onRowClick={(row) => alert(`onRowClick: ${row.coluna1}`)}

                />

                <div style={{ marginTop: '1rem' }}>

                    {/* <button
                        style={{ marginBottom: '10px', padding: '6px 12px', cursor: 'pointer' }}
                        onClick={() => setMostrarIgnorados(prev => !prev)}
                    >
                        {mostrarIgnorados ? 'Ocultar Ignorados' : 'Mostrar Ignorados'}
                    </button> */}

                    {/* <button
                        style={{ margin: '20px 0', padding: '4px 16px', borderRadius: '5px', cursor: 'pointer', fontSize: '18px' }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>

                    <div style={{ backgroundColor: '#ddd', padding: '10px', borderRadius: '5px', height: 'calc(100vh - 540px)', width: '500px', overflow: 'auto' }}>
                        <pre>{JSON.stringify(tableData, null, 2)}</pre>
                    </div> */}

                </div>

            </div>
        </div>
    );

}
