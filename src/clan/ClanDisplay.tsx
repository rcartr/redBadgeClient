import * as React from 'react';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';

import ClanUpdate from './ClanUpdate';
import Title from '../site/Title';
import APIURL from "../helpers/environment";

type StateData = {
    id: number,
    login: boolean,
    clanId: number,
    name: string,
    description: string,
    owner: number,
    sessionToken: string,
}

type PropsType = {
    state: StateData,
    sessionToken: string,
}

type StateType = {
    // id: number,
    clanId?: number,
    name: string,
    description: string,
    owner: number,
    clanArray: any
    open: boolean,
}

export default class ClanDisplay extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            clanId: 0,
            name: "",
            description: "",
            owner: 0,
            clanArray: [],
            open: false,
        }
        this.fetchClan = this.fetchClan.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    fetchClan = async() => {
        await fetch(`${APIURL}/clans/show`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
        .then (response => response.json())
        .then(clan => {
            this.setState({clanArray: clan})
            console.log(clan)
        })
        .catch(err => console.log(`${err}`))
    }

    componentDidMount() {
        this.fetchClan()
    }

    handleOpen() {
        this.setState({open: true})
      }
    
    handleClose() {
        this.setState({open: false})
      }

    render() {

        return (
            <div className="clanDiv">
                <Box>
                    <Title>Clan <IconButton aria-label="edit" onClick={this.handleOpen}><EditIcon fontSize="small" /></IconButton></Title>
                        <Dialog id="clanUpdateModal"
                                open={this.state.open}
                                onClose={this.handleClose}
                        >
                            <DialogContent>
                                <ClanUpdate state={this.props.state} sessionToken={this.props.sessionToken} />
                            </DialogContent>
                        </Dialog>
                    {this.state.clanArray.map((clan: any, index: any) => {
                        return(
                            <Box key={index}>
                                <Typography variant="h4" align="center">{clan.name}</Typography>
                                <Typography variant="body1" align="center">{clan.description}</Typography>
                            </Box>
                        )
                    }
                    )}
                    <Button variant="contained" size="small" startIcon={<RefreshIcon />} className="clanRefreshBtn" onClick={this.fetchClan}>
                    Refresh
                    </Button>
                </Box>
            </div>
        )
    }
}

// Access to fetch has been blocked by CORS policy: Response to preflight request doesn't pass access control check: It does not have HTTP ok status.