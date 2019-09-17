import React, { Component } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";

class Form extends Component {
    state = this.getInitialState();

    getInitialState() {
        const { exercise } = this.props;
        return exercise ? exercise : { title: '', description: '', muscles: '' };
    };

    handleChange = ({ target: { value, name } }) => this.setState({ [name]: value });

    handleSubmit = () => (
        this.props.onSubmit({
            id: this.state.title.toLowerCase().replace(/ /g, '-'),
            ...this.state
        })
    );

    render() {
        const { title, description, muscles } = this.state;
        const { exercise, muscles: categories } = this.props;

        return (
            <form>
                <TextField
                    label="Title"
                    value={ title }
                    name="title"
                    onChange={ this.handleChange }
                    margin="normal"
                    fullWidth
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="muscles">Muscles</InputLabel>

                    <Select
                        value={ muscles }
                        name="muscles"
                        onChange={ this.handleChange }
                    >
                        {
                            categories.map(category =>
                                <MenuItem key={ category } value={ category }>{ category }</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>

                <TextField
                    multiline
                    rowsMax="4"
                    label="Description"
                    value={ description }
                    name="description"
                    onChange={ this.handleChange }
                    margin="normal"
                    fullWidth
                />

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
}

export default Form;
