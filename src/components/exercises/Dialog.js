import React, { Component } from 'react';
import { Dialog as MuiDialog, DialogContent, DialogContentText, DialogTitle, Fab } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import { ExercisesContext } from '../../context';
import { Form } from './';

class Dialog extends Component {
    static contextType = ExercisesContext;

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
        const { muscles } = this.context;

        return <>
            <Fab
                size="small"
                onClick={ this.handleToggle }
                color='secondary'
            >
                <AddIcon />
            </Fab>

            <MuiDialog
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
            </MuiDialog>
        </>
    };
}

export default Dialog;
