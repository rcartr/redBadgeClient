import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import Title from '../site/Title';
import APIURL from '../helpers/environment';
import { AppDialog, appDialogState } from '../helpers/AppDialog';

type StateData = {
    login: boolean,
    email: string,
    password: string,
    username: string,
    role: string,
    clanId: number,
};

type PropsType = {
    state: StateData
    sessionToken: string
    updateToken: any
};

type StateType = {
    login?: boolean,
    email: string,
    password?: string,
    username?: string,
    role: string,
    clanId: number,
};

export default class MemberAdd extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            email: "",
            role: "",
            clanId: 0
        }
        this.addClanMember = this.addClanMember.bind(this);
    }

    handleSubmitClick = () => console.log('Dialog?!');

    addClanMember(event: any) {
        event.preventDefault();
        fetch(`${APIURL}/user/update/${this.state.email}`, {
            method: 'PUT',
            body: JSON.stringify({user: {clanId: this.props.state.clanId}}),
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

    stateEmail(event: any) {
        this.setState({ email: event.target.value })
    }

    render() {
        return (
            <div>
                <Title>Add Clan Member</Title>
                <Typography variant="subtitle2" color="primary">Enter email address and select if this member will have leadership privileges.<br/>
                Multiple members can have a leadership role.<p/>
                NOTE: User must already be registered in the database. Email must match.</Typography>
                <FormGroup onSubmit={this.addClanMember}>
                <TextField required
                    margin="normal"
                    id="email"
                    name="email"
                    label="Email Address"
                    autoComplete="email"
                    fullWidth
                    autoFocus
                    onChange={(event) => this.stateEmail(event)}
                    value={this.state.email}
                />
                    <FormControlLabel control={<Checkbox id="leaderSelect"/>} label="Leader" />
                    <Button className="authSubmit" 
                    type="submit" variant="contained" fullWidth 
                    onClick={() => appDialogState('Member added!', this.handleSubmitClick)}>
                    Submit
                    </Button>
                    <AppDialog />
                </FormGroup>
            </div>
        );
    };
};