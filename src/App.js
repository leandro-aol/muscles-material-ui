import React, { Component } from 'react';
import { CssBaseline } from "@material-ui/core";
import { Header, Footer } from './components/layouts';
import Exercises from './components/exercises';
import { muscles, exercises } from './store';
import { Provider } from './context';

class App extends Component {
    state = {
        exercises,
        exercise: {},
        editMode: false
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
        onSelect: this.handleExerciseSelect
    });

    render() {
        return <Provider value={ this.getContext() }>
            <CssBaseline />

            <Header />

            <Exercises />

            <Footer />
        </Provider>;
    }
}

export default App;