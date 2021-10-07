import * as React from 'react';
// import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

import Title from '../site/Title';
import APIURL from '../helpers/environment'

type StateData = {
    id: number,
    email: string,
    username: string,
    role: string,
    clanId: number,
    sessionToken: string,
    membersArray: any,
  }
  
  type PropsType = {
    state: StateData,
    sessionToken: string
  }
  
  type StateType = {
    id?: number,
    email: string,
    username: string,
    role: string,
    clanId?: number,
    membersArray: any,
    open: boolean,
  }

export default class Members extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            email: "",
            username: "",
            role: "",
            membersArray: [],
            open: false,
        }
        this.fetchMembers = this.fetchMembers.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    fetchMembers = async() => {
        await fetch(`${APIURL}/user/members`, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.props.sessionToken}`
          })
        })
        .then (response => response.json())
        .then(members => {
          this.setState({membersArray: members})
          console.log(members)
        })
        .catch(err => console.log(`${err}`))
      }
    
    componentDidMount() {
        this.fetchMembers()
      }
      
    handleOpen() {
        this.setState({open: true})
      }
    
    handleClose() {
        this.setState({open: false})
      }

    render() {

        return (
            <div className="membersDiv">
                <Title>Members<IconButton aria-label="refresh" onClick={this.fetchMembers}><RefreshIcon fontSize="small"/></IconButton></Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>name</TableCell>
                            <TableCell align="right">role</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.membersArray.map((members: any) => {
                        return(
                        <TableRow key={members.id.value}>
                            <TableCell>{members.username}</TableCell>
                            <TableCell align="right">{members.role}</TableCell>
                        </TableRow>
                        )
                    })
                    }
                    </TableBody>
                </Table>
        </div>
        );
    };
};