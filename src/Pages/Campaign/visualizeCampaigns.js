import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Container } from '@mui/material';
import withAuth from '../../Components/withAuth';





const columns = [

    { field: 'name', headerName: 'Name', width: 300, },
    { field: 'creator', headerName: 'Creator' },
    { field: 'totalSms', headerName: '#sms' },
    { field: 'creationDate', headerName: 'Creation date', width: 300 },
    { field: 'messageText', headerName: 'Message', width: 300 }
]




//nome creatore message text, smss, total sms, creation Date, start, finish
const VisualizeCampaigns = () => {
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch("http://10.200.200.4:4000/api/prova", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
        })
            
            .then((data) => data.json())
            .then((data) => setTableData(data))
            .catch((e) => {
                console.error(e)
            })

    },[])

    return (
        <Container>
            <div style={{ height: 700, width: '100%' }}>
                <h2>Campaign Storage</h2>
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={tableData}
                    columns={columns}
                    getRowHeight={() => 'auto'}
                    slots={{ toolbar: GridToolbar }}
                    sx={{
                        '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
                            py: 1,
                        },
                        '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
                            py: '15px',
                        },
                        '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
                            py: '22px',
                        },
                    }}
                />
            </div>

        </Container>


    );
}

export default withAuth(VisualizeCampaigns);