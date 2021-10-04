import * as React from 'react';

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

export default class ClanUpdate extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            name: "",
            description: "",
            owner: 0,
        }
        this.updateClan = this.updateClan.bind(this);
    }

    updateClan(event: any) {
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

        return (
            <div className="main">
            <React.Fragment>
                <Title>Clan Update Component</Title>
            </React.Fragment>
            </div>
        )
    }
}