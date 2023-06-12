import withAuth from '../../Components/withAuth';
import swal from 'sweetalert'
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Container } from '@mui/material';
import axios from 'axios';
import Navbar from '../../Components/navbar';
import configuration from "../../configuration/configuration.json";
const server_ip = configuration.server_ip;


function CampaignForm() {
  const [destinationNumbers, setDestinationNumbers] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  let fields = { name, destinationNumbers, message, user }
  const navigate = useNavigate()



  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await axios.post(`http://${server_ip}/api/campaign/initialize-campaign`, {
        ...fields,
        destinationNumbers: destinationNumbers.split(" "),
        user: JSON.parse(user)
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      });
      swal("Campaign created", "", "success")
        .then(() => {
          navigate("/send-campaigns");
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
        <form onSubmit={handleSubmit}>
          <h2>Create Campaign</h2>
          <Box mb={2}>
            <TextField
              label="Campaign Name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Recipients"
              value={destinationNumbers}
              onChange={(event) => {
                setDestinationNumbers(event.target.value);
              }}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Message"
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              multiline
              rows={4}
              fullWidth
            />
          </Box>
          <Button variant="contained" type="submit">
            Create
          </Button>
        </form>
      </Container>
    </>

  );
}

export default withAuth(CampaignForm);