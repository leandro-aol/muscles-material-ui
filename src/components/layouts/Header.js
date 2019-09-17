import React, { Component } from 'react';
import { compose } from 'recompose';
import { AppBar, Switch, Toolbar, Typography, withStyles } from '@material-ui/core';

import { Dialog } from '../exercises';
import { withContext } from "../../context";

const styles = {
    flex: {
        flex: 1
    }
};

class Header extends Component {
    render() {
        const { classes, toggleTheme } = this.props;

        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" color="inherit" className={ classes.flex }>
                        Exercise Database
                    </Typography>

                    <Switch onChange={ () => toggleTheme() } />

                    <Dialog />
                </Toolbar>
            </AppBar>
        );
    }
}

export default compose(
    withContext,
    withStyles(styles)
)(Header);
