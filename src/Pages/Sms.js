import withAuth from '../Components/withAuth';

import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function MessageForm() {
  const [destinationNumber, setDestinationNumber] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token')
  let fields = {destinationNumber,message}
  

  const handleSubmit = async e => {
    e.preventDefault();
    fetch('http://10.200.200.7:4000/api/sendsms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token
        },
        body: JSON.stringify(fields)    
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
        <h2>Send SMS</h2>
      <TextField
        label="Destinatario"
        value={destinationNumber}
        onChange={(event) => {
            setDestinationNumber(event.target.value);
          }}
        fullWidth
      />
      <TextField
        label="Messaggio"
        value={message}
        onChange={(event) => {
            setMessage(event.target.value);
          }}
        multiline
        rows={4}
        fullWidth
      />
      <Button variant="contained" type="submit">
        Invia
      </Button>
    </form>
  );
}

export default withAuth(MessageForm);