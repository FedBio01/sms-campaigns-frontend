import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Container } from '@mui/material';
import withAuth from '../../Components/withAuth';
import axios from 'axios'
import configuration from "../../configuration.json";
const server_ip = configuration.server_ip;





const columns = [

    { field: 'name', headerName: 'Name', width: 300, },
    { field: 'creator', headerName: 'Creator' },
    { field: 'totalSms', headerName: '#sms' },
    { field: 'creationDate', headerName: 'Creation date', width: 300 },
    { field: 'messageText', headerName: 'Message', width: 250 },
    { field: 'start', headerName: 'Status', width: 300 }
]




//nome creatore message text, smss, total sms, creation Date, start, finish
const VisualizeCampaigns = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get(`http://${server_ip}/api/visualizeCampaign`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => {
                setTableData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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