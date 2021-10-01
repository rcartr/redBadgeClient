import React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import Title from '../site/Title';

// Generate Event Data
function createData(
  id: number,
  eventDate: string,
  eventName: string,
  eventDescription: string,
  createdBy: string,
) {
  return { id, eventDate, eventName, eventDescription, createdBy };
}

const rows = [
  createData(
    0,
    '10 Oct 2021',
    'Campaign grinding',
    'Working through the campaign',
    'Example',
    ),
  createData(
    1,
    '11 Oct 2021',
    'Hardcore co-op',
    'Working through the hardcore campaign together.',
    'Archer',
    ),
  createData(
      2, 
      '14 Oct 2021', 
      'Boss gear grinding', 
      `Campaign boss raids. If you need better gear let's get it.`, 
      'Jon Snow',
    ),
  createData(
    3,
    '16 Oct 2021',
    'Endgame raids',
    `If you're high level we need everyone for this. Let's get that epic gear!`,
    'Jon Snow',
    ),
  createData(
    4,
    '18 Oct 2021',
    'Campaign grinding',
    'Working through the campaign.',
    'Example',
    ),
];

function eventClick(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Events() {
  return (
    <div className="main">
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.eventDate}</TableCell>
              <TableCell>{row.eventName}</TableCell>
              <TableCell>{row.eventDescription}</TableCell>
              <TableCell align="right">{`${row.createdBy}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={eventClick}>
        <Button variant="contained" size="small" className="buttonStyle">
        Add a new event
        </Button>
      </Link>
    </React.Fragment>
    </div>
  );
}