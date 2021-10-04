import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from '../site/Title';

type StateData = {
    login: boolean,
    email: string,
    password: string,
    username: string,
    role: string,
    clanId: number,
};

type PropsType = {
    state: StateData,
    sessionToken: any
};

type StateType = {
    login?: boolean,
    email?: string,
    password?: string,
    username?: string,
    role: string,
    clanId: number,
};

export default class MemberUpdate extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            role: "",
            clanId: 0
        }
    }

    render() {
        return (
            <div>
                <Title>Member Update component</Title>
            </div>
        );
    };
};