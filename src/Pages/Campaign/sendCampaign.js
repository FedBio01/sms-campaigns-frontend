import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'
import withAuth from '../../Components/withAuth';
import swal from 'sweetalert'
import axios from 'axios'
import configuration from "../../configuration.json";
import Navbar from '../../Components/navbar';
const server_ip = configuration.server_ip;





const columns = [

    { field: 'name', headerName: 'Campaign Name', width: 1000 }
]




//nome creatore message text, smss, total sms, creation Date, start, finish
const SendCampaigns = () => {
    const [tableData, setTableData] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        axios.post(`http://${server_ip}/api/userActivableCampaign`, { user: JSON.parse(user) }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then(response => setTableData(response.data))
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleClick = async (e, cellValues) => {
        e.preventDefault();
        let campaign = { campaign: cellValues.row.name };

        try {
            await axios.post(`http://${server_ip}/api/SendCampaign`, campaign, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            });

            swal("Campaign sent", "", "success").then(() => {
                window.location.reload(false);
            });
        } catch (error) {
            console.error(error);
            swal("Failed", "", "error");
        }
    };

    return (
        <>
            <Navbar />
            <Container>
                <div style={{ height: 700, width: '100%' }}>
                    <h2>Send Campaign</h2>
                    <DataGrid
                        getRowId={(row) => row._id}
                        rows={tableData}
                        columns={[
                            ...columns,
                            {

                                field: 'send',
                                headerName: 'Send',
                                renderCell: (cellValues) => (
                                    <Button
                                        variant="contained"
                                        endIcon={<SendIcon />}
                                        onClick={(event) => {
                                            handleClick(event, cellValues)
                                        }}
                                    >
                                        Send
                                    </Button>
                                ),
                            },
                        ]}
                    />
                </div>

            </Container>
        </>


    );
}

export default withAuth(SendCampaigns);