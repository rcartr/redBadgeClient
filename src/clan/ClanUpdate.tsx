import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Title from '../site/Title';
import { AppDialog, appDialogState } from '../helpers/AppDialog';
import APIURL from '../helpers/environment';

type StateData = {
    login: boolean,
    id: number,
    name: string,
    description: string,
    owner: number,
    clanId: number,
}

type PropsType = {
    state: StateData,
    sessionToken: string
}

type StateType = {
    id?: number,
    name: string,
    description: string,
    owner?: number,
    clanId: number
}

export default class ClanUpdate extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            name: "",
            description: "",
            clanId: 0,
        }
        this.updateClan = this.updateClan.bind(this);
    }

    // helper for modals
    handleSubmitClick = () => console.log('Dialog?!');

    updateClan(event: any) {
        event.preventDefault();
        fetch(`${APIURL}/clans/update/${this.props.state.clanId}`, {
            method: 'PUT',
            body: JSON.stringify({clan: {name: this.state.name, description: this.state.description}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            
        })
    }

    stateClanName(event: any) {
        this.setState({ name: event.target.value })
    }

    stateClanDescription(event: any) {
        this.setState({ description: event.target.value })
    }

    render() {

        return (
            <div className="main">
            <Box component="form" onSubmit={this.updateClan}>
                <Title>Edit Clan</Title>
                <Typography variant="subtitle2" color="primary">Change clan name or description.<br/>
                Description can also be displayed as message of the day.</Typography>
                <TextField
                    margin="normal"
                    id="clanName"
                    name="clanName"
                    label="Clan name"
                    fullWidth
                    onChange={(event) => this.stateClanName(event)}
                    value={this.state.name}
                />
                <TextField
                    margin="normal"
                    id="clanDescription"
                    name="clanDescription"
                    label="Clan description/MOTD"
                    fullWidth
                    autoFocus
                    onChange={(event) => this.stateClanDescription(event)}
                    value={this.state.description}
                />
                <Button className="authSubmit" 
                    type="submit" variant="contained" fullWidth 
                    onClick={() => appDialogState('Clan info changed!', this.handleSubmitClick)}>
                    Submit
                </Button>
                <AppDialog />
            </Box>
            </div>
        )
    }
}