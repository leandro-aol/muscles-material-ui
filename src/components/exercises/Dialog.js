import React, { Component } from 'react';
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import Form from './Form';

export default class extends Component {
    state = {
        open: false
    };

    handleToggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    handleFormSubmit = exercise => {
        this.handleToggle();

        this.props.onCreate(exercise);
    };

    render() {
        const { open } = this.state;
        const { muscles } = this.props;

        return <>
            <Fab
                size="small"
                onClick={ this.handleToggle }
                color='secondary'
            >
                <AddIcon />
            </Fab>

            <Dialog
                open={ open }
                onClose={ this.handleToggle }
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>
                    Create a New Exercise
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below.
                    </DialogContentText>

                    <Form
                        muscles={ muscles }
                        onSubmit={ this.handleFormSubmit }
                    />
                </DialogContent>
            </Dialog>
        </>
    };
};
