import * as React from 'react';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider'

import Title from '../site/Title';
import APIURL from "../helpers/environment";

type StateData = {
    login: boolean,
    id: number,
    name: string,
    description: string,
    owner: number,
}

type PropsType = {
    state: StateData,
    sessionToken: any
}

type StateType = {
    id: number,
    name: string,
    description: string,
    owner: number,
    clanArray: any
}

export default class ClanDisplay extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            id: 0,
            name: "",
            description: "",
            owner: 0,
            clanArray: []
        }
    }

    fetchClan = () => {
        fetch(`${APIURL}/clan/${this.state.id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
        .then (response => response.json())
        .then(data => {this.setState({clanArray: data})})
        .catch(err => console.log(`${err}`))
    }

    componentDidMount() {
        this.fetchClan()
    }

    render() {

        return (
            <div className="main">
                <Box>
                    <Title>Clan</Title>
                    <Divider><Typography variant="h3" align="center">{this.state.clanArray.name}</Typography></Divider>
                    <Typography variant="body1" align="center">{this.state.clanArray.description}</Typography>
                    <Typography variant="subtitle1">Leader: {this.state.clanArray.owner}</Typography>
                </Box>
            </div>
        )
    }
}
