import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Container } from '@mui/material';
import withAuth from '../../Components/withAuth';
import axios from 'axios'
import configuration from "../../configuration/configuration.json";
import Navbar from '../../Components/navbar';
const server_ip = configuration.server_ip;





const columns = [

  { field: 'name', headerName: 'Name', width: 230,},
  { field: 'totalSms', headerName: '#sms', width: 120 },
  { field: 'start', headerName: 'Start', width: 240 },
  { field: 'percentSent', headerName: '%Sent sms', width: 120 },
  { field: 'avgSentTime', headerName: 'Avg Sent Time (s)', width: 140},
  { field: 'totalSent', headerName: '#Sent sms', width: 120 },
  { field: 'totalRejected', headerName: '#Rejected sms', width: 120 },
]




//nome creatore message text, smss, total sms, creation Date, start, finish
const StatsCampaigns = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user')

    axios.post(`http://${server_ip}/api/campaign/get-statistics-by-user`, { user: JSON.parse(user) }, {
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
    <>
      <Navbar />
      <Container>
        <div style={{ height: 700, width: '100%' }}>
          <h2>Campaign Statistics</h2>
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
    </>


  );
}

export default withAuth(StatsCampaigns);