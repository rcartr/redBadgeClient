import React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Title from '../site/Title';
import EventCreate from './EventCreate';
import APIURL from '../helpers/environment'

type StateData = {
  id: number,
  eventName: string,
  eventDate: string,
  eventDescription: string,
  createdBy: string,
  clanId: number,
  sessionToken: string,
  eventsArray: any,
}

type PropsType = {
  state: StateData,
  sessionToken: string
}

type StateType = {
  id: number,
  eventName: string,
  eventDate: string,
  eventDescription: string,
  createdBy: string,
  clanId?: number
  eventsArray: [],
  open: boolean,
}

function eventClick(event: React.MouseEvent) {
  event.preventDefault();
}

export default class Events extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      id: 0,
      eventDate: "",
      eventName: "",
      eventDescription: "",
      createdBy: "",
      eventsArray: [],
      open: false,
    }
    this.fetchEvents = this.fetchEvents.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  fetchEvents = async() => {
    await fetch(`${APIURL}/events/show`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.sessionToken}`
      })
    })
    .then (response => response.json())
    .then(events => {
      this.setState({eventsArray: events})
      console.log(events)
    })
    .catch(err => console.log(`${err}`))
  }

  componentDidMount() {
    this.fetchEvents()
  }
  
  handleOpen() {
    this.setState({open: true})
  }

  handleClose() {
    this.setState({open: false})
  }
  
  render() {

    return (
      <div className="eventsDiv">
      <React.Fragment>
      <Title>Clan Events</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Event</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Created By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.eventDate}</TableCell>
                <TableCell>{row.eventName}</TableCell>
                <TableCell>{row.eventDescription}</TableCell>
                <TableCell align="right">{`${row.createdBy}`}</TableCell>
              </TableRow>
            ))} */}
            {this.state.eventsArray.map((events: any, index: any) => {
              return (
                <TableRow key={index}>
                  <TableCell>{events.eventDate}</TableCell>
                  <TableCell>{events.eventName}</TableCell>
                  <TableCell>{events.eventDescription}</TableCell>
                  <TableCell align="right">{`${events.createdBy}`}</TableCell>
                  <TableCell><EditIcon fontSize="small" /><DeleteIcon fontSize="small"/></TableCell>
              </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <Link color="primary" onClick={eventClick}>
          <Button variant="contained" size="small" className="buttonStyle"
                  onClick={this.handleOpen}>
          Add a new event
          </Button>
          <Dialog
                id="eventCreateModal"
                open={this.state.open}
                onClose={this.handleClose}
                >
                    <DialogContent>
                        <EventCreate state={this.props.state} sessionToken={this.props.sessionToken} />
                    </DialogContent>
                </Dialog>
          <Button variant="contained" size="small" startIcon={<RefreshIcon />} className="buttonStyle" onClick={this.fetchEvents}>
           Refresh
          </Button>
        </Link>
      </React.Fragment>
      </div>
    );
  }
}