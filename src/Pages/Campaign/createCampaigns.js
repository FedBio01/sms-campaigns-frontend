import withAuth from '../../Components/withAuth';

import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function CampaignForm() {
  const [destinationNumbers, setDestinationNumbers] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  let fields = {name,destinationNumbers,message,user}
  

  const handleSubmit = async e => {
    e.preventDefault();
    fetch('http://10.200.200.3:3000/api/initializeCampaign', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token
        },
        body: JSON.stringify({...fields, destinationNumbers: destinationNumbers.split(" "), user: JSON.parse(user)})    
    })
    .then((data) => {
        console.log(data.text)
    })
    .catch((error) => {
        console.error(error)
    })
  };

  return (
    <form onSubmit={handleSubmit}>
        <h2>Create Campaign</h2>
        <TextField
        label="Nome Campaign"
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
  );
}

export default withAuth(CampaignForm);