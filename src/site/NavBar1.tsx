import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

// import { AppDialog, appDialogState } from '../helpers/AppDialog';
import MemberAdd from '../members/MemberAdd';

// helper for modals
// const handleSubmitClick = () => console.log('Dialog?!');

type StateData = {
  login: boolean,
  id: number,
  name: string,
  description: string,
  owner: number,
  role: string,
  clanId: number,
  email: string,
  password: string,
  username: string,
  sessionToken: string,
}

type PropsType = {
  state: StateData
  sessionToken: string
  updateToken: any
}

type StateType = {
  open: boolean,
}

export default class NavBarList1 extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      open: false
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({open: true})
  }

  handleClose() {
    this.setState({open: false})
  }

  render() {

  return(
  <div>
    <List>
    <ListItem button onClick={this.handleOpen}>
      <ListItemIcon>
        <PersonAddIcon />
      </ListItemIcon>
      <ListItemText primary="Add Member" />
    </ListItem>
        <Dialog
            id="addMemberModal"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <DialogContent>
                <MemberAdd state={this.props.state} sessionToken={this.props.sessionToken} updateToken={this.props.updateToken} />
            </DialogContent>
        </Dialog>
    <ListItem button>
      <ListItemIcon>
        <EventNoteIcon />
      </ListItemIcon>
      <ListItemText primary="Events" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <EmojiEventsIcon />
      </ListItemIcon>
      <ListItemText primary="Leaderboard" />
    </ListItem>
    </List>
    </div>
  );
  }
}