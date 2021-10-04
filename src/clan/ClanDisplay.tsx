import * as React from 'react';
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
}

export default class ClanDisplay extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            id: 0,
            name: "",
            description: "",
            owner: 0,
        }
    }

    fetchClan(event: any) {
        event.preventDefault()
        fetch(`${APIURL}/clan/${this.state.id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
        .then (
            (response) => response.json()
        )
        .then((data) => {
            this.props.sessionToken(data.sessionToken)
            console.log(data)
        })
        .catch(err => console.log(err))
    }

    render() {

        return (
            <div className="main">
                <React.Fragment>
                    <Title>Clan</Title>
                    <Divider variant="middle" />
                </React.Fragment>
            </div>
        )
    }
}
