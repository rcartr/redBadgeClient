import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { Close } from '@mui/icons-material';
import create from 'zustand';

type AppDialogStore = {
    message: any;
    onSubmit?: () => void;
    close: () => void;
}

const useAppDialogStore = create<AppDialogStore>((set) => ({
    message: undefined,
    onSubmit: undefined,
    close: () =>
        set({
            onSubmit: undefined,
        }),
}));

export const appDialogState = (message: string, onSubmit: () => void) => {
    useAppDialogStore.setState({
        message,
        onSubmit
    });
};

export const AppDialog: React.FC = () => {
    const { message, onSubmit, close } = useAppDialogStore();

    return(
        <Dialog open={Boolean(onSubmit)} onClose={close} maxWidth="sm">
            <DialogTitle>Alert!</DialogTitle>
            <Box position="absolute" top={0} right={0}>
                <IconButton onClick={close}>
                    <Close />
                </IconButton>
            </Box>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button className="dialogButton" color="primary" variant="contained" size="small"
                    onClick={() => {
                        if(onSubmit) {
                            onSubmit();
                        }
                        close();
                    }}
                >OK</Button>
            </DialogActions>
        </Dialog>
    );
};