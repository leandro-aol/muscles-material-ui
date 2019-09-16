import React, { Fragment } from 'react';
import {
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton, withStyles
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

import Form from './Form';

const styles = theme => ({
    paper: {
        padding: theme.spacing(3),
        overflowY: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginTop: 5,
            height: 'calc(100% - 10px)',
        },
        [theme.breakpoints.down('xs')]: {
            height: '100%'
        }
    },
    '@global': {
        'html, body, #root': {
            height: '100%'
        }
    },
    container: {
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px - 48px)'
        },
        [theme.breakpoints.down('xs')]: {
            height: 'calc(100% - 56px - 48px)'
        }
    },
    item: {
        [theme.breakpoints.down('xs')]: {
            height: '50%'
        }
    }
});

export default withStyles(styles)(
    ({
         classes,
         muscles, exercises, category, editMode, onSelect, exercise,
         exercise: {
             id,
             title = "Welcome!",
             description = "Please select an exercise from the list on the left.",
         },
         onDelete, onSelectEdit, onEdit
     }) => (
        <Grid container className={ classes.container }>
            <Grid item className={ classes.item } xs={ 12 } sm={ 6 }>
                <Paper className={ classes.paper }>
                    {
                        exercises.map(([ muscle, exercises ]) => (
                            !category || category === muscle
                                ? (
                                    <Fragment key={ muscle }>
                                        <Typography
                                            color="secondary"
                                            variant="h5"
                                            style={ { textTransform: 'capitalize' } }
                                        >
                                            { muscle }
                                        </Typography>

                                        <List key={ { muscle } } component="ul">
                                            {
                                                exercises.map(({ id, title }) => (
                                                    <ListItem
                                                        key={ id }
                                                        button
                                                        onClick={ () => onSelect(id) }
                                                    >
                                                        <ListItemText primary={ title } />

                                                        <ListItemSecondaryAction>
                                                            <IconButton
                                                                color="primary"
                                                                onClick={ () => onSelectEdit(id) }
                                                            >
                                                                <Edit />
                                                            </IconButton>
                                                            <IconButton
                                                                color="primary"
                                                                onClick={ () => onDelete(id) }
                                                            >
                                                                <Delete />
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                ))
                                            }
                                        </List>
                                    </Fragment>
                                )
                                : null

                        ))
                    }
                </Paper>
            </Grid>

            <Grid item className={ classes.item } xs={ 12 } sm={ 6 }>
                <Paper className={ classes.paper }>
                    <Typography
                        variant="h4"
                        color="secondary"
                        gutterBottom
                    >
                        { title }
                    </Typography>
                    {
                        editMode
                            ? <Form
                                key={ id }
                                exercise={ exercise }
                                muscles={ muscles }
                                onSubmit={ onEdit }
                            />
                            : <Typography variant="subtitle1">
                                { description }
                            </Typography>
                    }
                </Paper>
            </Grid>
        </Grid>
    ));
