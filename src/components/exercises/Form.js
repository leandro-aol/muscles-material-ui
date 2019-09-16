import React, { Component } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";

export default class extends Component {
    state = this.getInitialState();

    getInitialState() {
        const { exercise } = this.props;
        return exercise ? exercise : { title: '', description: '', muscles: '' };
    };

    handleChange = name => ({ target: { value } }) => this.setState({ [name]: value });

    handleSubmit = () => {
        // TODO: validate

        this.props.onSubmit({
            id: this.state.title.toLocaleLowerCase().replace(/ /g, '-'),
            ...this.state
        });
    };

    render() {
        const { title, description, muscles } = this.state;
        const { exercise, muscles: categories } = this.props;

        return (
            <form>
                <TextField
                    label="Title"
                    value={ title }
                    onChange={ this.handleChange('title') }
                    margin="normal"
                    fullWidth
                />

                <br />

                <FormControl fullWidth>
                    <InputLabel htmlFor="muscles">
                        Muscles
                    </InputLabel>

                    <Select
                        value={ muscles }
                        onChange={ this.handleChange('muscles') }
                    >
                        {
                            categories.map(category =>
                                <MenuItem key={ category } value={ category }>{ category }</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>

                <br />

                <TextField
                    multiline
                    rowsMax="4"
                    label="Description"
                    value={ description }
                    onChange={ this.handleChange('description') }
                    margin="normal"
                    fullWidth
                />

                <br />

                <Button
                    color="primary"
                    variant="contained"
                    onClick={ this.handleSubmit }
                    disabled={ !title || !muscles }
                >
                    { exercise ? 'Edit' : 'Create' }
                </Button>
                <br /><br />
            </form>
        );
    }
};