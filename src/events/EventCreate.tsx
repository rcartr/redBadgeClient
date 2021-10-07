import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';

import APIURL from '../helpers/environment';
import Title from '../site/Title';
import { AppDialog, appDialogState } from '../helpers/AppDialog'

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
    sessionToken: string
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
                eventDescription: this.state.eventDescription
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

    handleSubmitClick = () => console.log('Dialog?!');

    stateEventName(event: any) {
        this.setState({ eventName: event.target.value })
    }
    stateEventDate(event: any) {
        this.setState({ eventDate: event.target.value })
    }
    stateEventDescription(event: any) {
        this.setState({ eventDescription: event.target.value })
    }

    render() {
        return (
            <div className="eventCreateDiv">
                <Box component="form" onSubmit={this.createEvent}>
                    <Title>New Event</Title>
                    <TextField required
                    margin="normal"
                    id="eventDate"
                    name="eventDate"
                    label="Event Date (example: 1 Jan 2022)"
                    value={this.state.eventDate}
                    autoFocus
                    fullWidth
                    onChange={(event) => this.stateEventDate(event)}
                    />
                    <TextField required
                    margin="normal"
                    id="eventName"
                    name="eventName"
                    label="Event Name"
                    value={this.state.eventName}
                    fullWidth
                    onChange={(event) => this.stateEventName(event)}
                    />
                    <TextField required
                    margin="normal"
                    id="eventDescription"
                    name="eventDescription"
                    label="Event Description"
                    value={this.state.eventDescription}
                    fullWidth
                    rows="2"
                    onChange={(event) => this.stateEventDescription(event)}
                    />
                    <Button className="authSubmit"
                    type="submit" variant="contained" fullWidth
                    onClick={() => appDialogState('Event created! Please refresh the event feed if it does not appear momentarily.', this.handleSubmitClick)}>
                    Submit
                    </Button>
                    <AppDialog />
                </Box>
            </div>
        );
    };
  };