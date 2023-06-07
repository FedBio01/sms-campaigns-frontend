import React from "react";
import withAuth from "../../Components/withAuth";

import { Typography, TextField} from '@mui/material';

class StatsCampaigns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignName: '',
      totalNumbers: 0,
      message: ''
    };
  }

  handleCampaignNameChange = (event) => {
    this.setState({ campaignName: event.target.value });
  };

  handleTotalNumbersChange = (event) => {
    this.setState({ totalNumbers: event.target.value });
  };

  handleMessageChange = (event) => {
    this.setState({ message: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Invia i dati della campagna al tuo backend o esegui l'azione desiderata
    // Qui puoi effettuare una richiesta API per inviare i messaggi agli utenti
    // Utilizza i valori presenti in this.state.campaignName, this.state.totalNumbers e this.state.message
    console.log('Dati della campagna inviati:', this.state);
  };

  render() {
    return (
      <div>
        <Typography variant="h5">SMS Campaign</Typography>
        <form onSubmit={this.handleSubmit}>
          <TextField
            label="Nome of Campaigns"
            value={this.state.campaignName}
            onChange={this.handleCampaignNameChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Total number"
            type="number"
            value={this.state.totalNumbers}
            onChange={this.handleTotalNumbersChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Message"
            value={this.state.message}
            onChange={this.handleMessageChange}
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
        </form>
      </div>
    );
  }
}

export default withAuth(StatsCampaigns);