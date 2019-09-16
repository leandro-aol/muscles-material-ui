import React from 'react';
import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';
import CreateDialog from '../exercises/Dialog';

const styles = {
    flex: {
        flex: 1
    }
};

export default withStyles(styles)(({ classes, onExerciseCreate }) => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h5" color="inherit" className={ classes.flex }>
                Exercise Database
            </Typography>

            <CreateDialog />
        </Toolbar>
    </AppBar>
));
