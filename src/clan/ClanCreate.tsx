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
    email: string,
    name: string,
    description: string,
    owner: number,
    role: string,
    clanId: number,
    sessionToken: string,
}

type PropsType = {
    state: StateData,
    sessionToken: string,
    updateToken: any
}

type StateType = {
    email: string,
    name: string,
    description: string,
    role?: string,
    clanId?: number,
}


export default class ClanCreate extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            email: "",
            name: "",
            description: "",
        }
        this.updateUserState = this.updateUserState.bind(this);
        this.createClan = this.createClan.bind(this);
        this.handleNewClanUserUpdate = this.handleNewClanUserUpdate.bind(this);
    }

    componentDidMount() {

    }

    // helper for modals
    handleSubmitClick = () => console.log('Dialog?!');

    stateClanName(event: any) {
        this.setState({ name: event.target.value })
    }

    stateClanDescription(event: any) {
        this.setState({ description: event.target.value })
    }

    stateEmail(event: any) {
        this.setState({ email: event.target.value })
    }

    updateUserState = (role: string, clanId: number) => {
        if(true) {
            this.setState({role: role, clanId: clanId})
        }
    }

    createClan(event: any) {
        event.preventDefault()
        fetch(`${APIURL}/clans/create`, {
            method: 'POST',
            body: JSON.stringify({clan: {name: this.state.name, description: this.state.description}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.state.sessionToken}`
            })
        }) 
        .then(res => res.json())
        .then((newClan => {
            console.log(newClan)
            this.updateUserState(null, newClan.id)
        }))
        .catch((err: any) => console.log(`${err}`))
    }

    handleNewClanUserUpdate(event: any) {
        event.preventDefault()
        fetch(`${APIURL}/user/update/${this.state.email}`, {
            method: 'PUT',
            body: JSON.stringify({user: {role: "admin", clanId: this.state.clanId}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.state.sessionToken}`
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            this.updateUserState(data.role, data.clanId)
        })
        .catch((err: any) => console.log(`${err}`))
    }


    render() {
        return(
            <div className="main">
                <Title>Create Clan</Title>
                <Typography variant="subtitle2" color="primary">Note: You can only belong to one clan.<br/>
                Create clan and then update user to take admin control of the clan.</Typography>
                <Box component="form" onSubmit={this.createClan}>
                <TextField required
                    margin="normal"
                    id="clanName"
                    name="clanName"
                    label="Clan name"
                    fullWidth
                    onChange={(event) => this.stateClanName(event)}
                    value={this.state.name}
                />
                <TextField required
                    margin="normal"
                    id="clanDescription"
                    name="clanDescription"
                    label="Clan description/MOTD"
                    fullWidth
                    onChange={(event) => this.stateClanDescription(event)}
                    value={this.state.description}
                />
                <TextField required
                    margin="normal"
                    id="email"
                    name="email"
                    label="Verify the email you login with"
                    fullWidth
                    onChange={(event) => this.stateEmail(event)}
                    value={this.state.email}
                />
                <Button className="authSubmit" 
                    type="submit" variant="contained" fullWidth 
                    onClick={() => appDialogState('New clan created!', this.handleSubmitClick)}>
                    Create Clan
                </Button>
                <AppDialog />
                <Button className="authSubmit" variant="outlined" fullWidth
                    onClick={this.handleNewClanUserUpdate}>
                    Update User
                </Button>
                </Box>
            </div>
        )
    }
}

