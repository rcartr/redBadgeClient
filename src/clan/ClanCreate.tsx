import * as React from 'react';
import Typography from '@mui/material/Typography';

import Title from '../site/Title';
import APIURL from '../helpers/environment';

type StateData = {
    login: boolean,
    id: number,
    name: string,
    description: string,
    owner: number,
    sessionToken: string,
}

type PropsType = {
    state: StateData,
    sessionToken: any
}

type StateType = {
    id?: number,
    name: string,
    description: string,
    owner: number,
}


export default class ClanCreate extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            name: "",
            description: "",
            owner: 0,
        }
        this.createClan = this.createClan.bind(this);
        this.handleNewClanUserUpdate = this.handleNewClanUserUpdate.bind(this);
    }

    createClan(event: any) {
        event.preventDefault();
        fetch(`${APIURL}/clans/create`, {
            method: 'POST',
            body: JSON.stringify({clan: {name: this.state.name, description: this.state.description}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.state.sessionToken}`
            })
        }) 
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            this.handleNewClanUserUpdate
        })
    }

    handleNewClanUserUpdate(event: any) {
        event.preventDefault();
        fetch(`${APIURL}/user/update/${this.props.state.owner}`, {
            method: 'PUT',
            body: JSON.stringify({user: {role: "admin", clanId: this.state.id}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.state.sessionToken}`
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            
        })
    }


    render() {
        return(
            <div className="main">
            <React.Fragment>
                <Title>Clan Create Component</Title>
                <Typography variant="body2" color="alert">Note: You can only belong to one clan. Creating a new clan will remove you from current clan and make you the leader of the created clan.</Typography>
            </React.Fragment>
            </div>
        )
    }
}

