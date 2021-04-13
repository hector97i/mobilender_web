import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';
import useGetOrders from '../hooks/useGetOrders'

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'client', headerName: 'Cliente', width: 130 },
    { field: 'created_at', headerName: 'Fecha de creacion', width: 180 },
    { field: 'served_at', headerName: 'Surtido', width: 180 },
    { field: 'order_to', headerName: 'Centro', width: 150 },
    // { field: 'articles', headerName: 'Articulos', width: 150 },
    
];


export default function Orders() {

    const {data: rowData, loading} = useGetOrders();
    
    var orders = rowData;
    rowData.forEach(function(v){delete v.articles});

    return (
        <div style={{ height: 400, width: '100%' }}>
            {loading ? 
            <Typography>Loading</Typography>
            :
            <DataGrid rows={rowData} columns={columns} pageSize={5} checkboxSelection />
            }
        </div>
    )
}
