// import React, { PureComponent } from 'react';
import React, { Component } from 'react';
import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { red, amber } from '@material-ui/core/colors';

import { Header, Footer } from './components/layouts';
import { Viewer } from './components/exercises';
import { muscles, exercises } from './store';
import { Provider } from './context';

const tema = {
    palette: {
        primary: red,
        secondary: {
            main: amber.A400,
            light: amber[200],
            dark: amber[700]
        },
        type: 'dark'
    },
    spacing: value => value * 10,
};

// class App extends PureComponent {
class App extends Component {
    state = {
        exercises,
        exercise: {},
        editMode: false,
        category: '',
        tema
    };

    handleToggleTheme = () => {
        const newPaletteType = tema.palette.type === 'light' ? 'dark' : 'light';
        const newState = this.state;

        newState.tema.palette.type = newPaletteType;
        this.setState(newState);
    };

    getExercisesByMuscle() {
        const initExercises = muscles.reduce((exercises, muscle) => ({
            ...exercises,
            [muscle]: []
        }), {});

        return Object.entries(
            this.state.exercises.reduce((exercises, exercise) => {
                const { muscles } = exercise;

                exercises[muscles] = [ ...exercises[muscles], exercise ];

                return exercises;
            }, initExercises)
        );
    }

    handleCategorySelect = category => {
        this.setState({
            category
        })
    };

    handleExerciseSelect = id => {
        this.setState(({ exercises }) => ({
            exercise: exercises.find(exercise => exercise.id === id),
            editMode: false
        }));
    };

    handleExerciseCreate = exercise => {
        this.setState(({ exercises }) => ({
            exercises: [
                ...exercises,
                exercise
            ]
        }))
    };

    handleExerciseDelete = id => {
        this.setState(({ exercises, exercise, editMode }) => ({
            exercises: exercises.filter(exercise => exercise.id !== id),
            editMode: exercise.id === id ? false : editMode,
            exercise: exercise.id === id ? {} : exercise
        }))
    };

    handleExerciseSelectEdit = id => {
        this.setState(({ exercises }) => ({
            exercise: exercises.find(exercise => exercise.id === id),
            editMode: true
        }))
    };

    handleExerciseEdit = editedExercise => {
        this.setState(({ exercises }) => ({
            exercises: [
                ...exercises.filter(exercise => exercise.id !== editedExercise.id),
                editedExercise
            ],
            exercise: editedExercise
        }))
    };

    getContext = () => ({
        muscles,
        ...this.state,
        exercisesByMuscles: this.getExercisesByMuscle(),
        onCategorySelect: this.handleCategorySelect,
        onCreate: this.handleExerciseCreate,
        onEdit: this.handleExerciseEdit,
        onSelectEdit: this.handleExerciseSelectEdit,
        onDelete: this.handleExerciseDelete,
        onSelect: this.handleExerciseSelect,
        toggleTheme: this.handleToggleTheme,
    });

    render() {
        const muiTheme = createMuiTheme(this.state.tema);

        return (
            <MuiThemeProvider theme={ muiTheme }>
                <Provider value={ this.getContext() }>
                    <CssBaseline />

                    <Header />

                    <Viewer />

                    <Footer />
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;