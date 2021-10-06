import * as React from 'react';
import Link from '@mui/material/Link'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import PublicIcon from '@mui/icons-material/Public';
import GroupsIcon from '@mui/icons-material/Groups';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MessageIcon from '@mui/icons-material/Message';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Divider from '@mui/material/Divider';

import { AppDialog, appDialogState } from '../helpers/AppDialog';
import ContactMe from './Contact';

const handleSubmit = () => console.log('Dialog?!');

export const navBarList = (
  
  <div>
    <ListSubheader>Dashboard</ListSubheader>
   
    <ListItem button>
      <ListItemIcon>
        <PublicIcon />
      </ListItemIcon>
      <ListItemText primary="Create Clan" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GroupsIcon />
      </ListItemIcon>
      <ListItemText primary="Members" />
    </ListItem>
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
    <Divider />
    <ListSubheader>Support</ListSubheader>
    <Link underline="none" href="mailto:rbc.coding@gmail.com">
      <ListItem button onClick={() =>
          appDialogState(`If your email client does not load, you can reach me at: rbc.coding@gmail.com`, handleSubmit)}>
        <ListItemIcon>
          <MessageIcon />
        </ListItemIcon>
        <ListItemText primary="Contact" />
      </ListItem>
      <AppDialog />
    </Link>
    <ListItem button>
      <ListItemIcon>
        <AttachMoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Donate" />
    </ListItem>
  </div>
);
