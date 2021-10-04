import * as React from 'react';

import APIURL from '../helpers/environment';
import Title from '../site/Title';

type StateData = {
    id: number,
    eventName: string,
    eventDate: string,
    eventDescription: string,
    createdBy: string,
    clanId: number,
    sessionToken: string
  }
  
  type PropsType = {
    state: StateData,
    sessionToken: any
  }
  
  type StateType = {
    id?: number,
    eventName: string,
    eventDate: string,
    eventDescription: string,
    createdBy?: string,
    clanId?: number
  }

  export default class EventCreate extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            eventName: "",
            eventDate: "",
            eventDescription: "",
        }
        this.createEvent = this.createEvent.bind(this);
    }

    createEvent(event: any) {
        event.preventDefault();
        fetch(`${APIURL}/events/create`, {
            method: 'POST',
            body: JSON.stringify({clan: {
                eventName: this.state.eventName,
                eventDate: this.state.eventDate,
                description: this.state.eventDescription,
            }}),
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
                <Title>Event Create component</Title>
            </div>
        );
    };
  };