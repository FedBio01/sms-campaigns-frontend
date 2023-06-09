import withAuth from '../../Components/withAuth';
import swal from 'sweetalert'
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Container } from '@mui/material';
import axios from 'axios'

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
      await axios.post('http://10.200.200.4:4000/api/initializeCampaign', {
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
            navigate("/SendCampaigns");
          });
    } catch (error) {
      console.error(error);
      swal("Failed", "", "error");
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h2>Create Campaign</h2>
        <TextField
          label="Campaign Name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          fullWidth
        />
        <TextField
          label="Recipients"
          value={destinationNumbers}
          onChange={(event) => {
            setDestinationNumbers(event.target.value);
          }}
          fullWidth
        />
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
        <Button variant="contained" type="submit">
          Create
        </Button>
      </form>
    </Container>
  );
}

export default withAuth(CampaignForm);