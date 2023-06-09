import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'
import withAuth from '../../Components/withAuth';
import swal from 'sweetalert'
import {useNavigate} from "react-router-dom";





const columns = [

    { field: 'name', headerName: 'Campaign Name', width: 1000 }
]




//nome creatore message text, smss, total sms, creation Date, start, finish
const SendCampaigns = () => {
    const [tableData, setTableData] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')
        fetch("http://10.200.200.4:4000/api/userActivableCampaign", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ user: JSON.parse(user) })
        })
            .then((data) => data.json())
            .then((data) => setTableData(data))
            .catch((e) => {
                console.error(e)
            })

    }, [])

    const handleClick = async (e, cellValues) => {
        e.preventDefault();
        let campaign = { campaign: cellValues.row.name }
        console.log(campaign)
        fetch('http://10.200.200.4:4000/api/SendCampaigns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(campaign)
        })

            .then((data) => {
                swal("Campaign sent", "", "success")
                    .then(() => {
                        navigate("/sendCampaign")
                    })
            })
            .catch((error) => {
                console.error(error)
                swal("Failed", "", "error");
            })
    };

    return (
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


    );
}

export default withAuth(SendCampaigns);