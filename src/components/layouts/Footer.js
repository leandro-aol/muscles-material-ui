import React, { Component } from 'react';
import { AppBar, Tabs, Tab, withWidth } from '@material-ui/core';
import { withContext } from "../../context";

class Footer extends Component {
    onIndexSelect = (event, index) => {
        const { onCategorySelect, muscles } = this.props;
        return onCategorySelect(index === 0 ? '' : muscles[index - 1]);
    };

    getIndex = () => {
        const { category, muscles } = this.props;

        return category
            ? muscles.findIndex(muscle => muscle === category) + 1
            : 0;
    };

    render() {
        const { width, muscles } = this.props;

        return (
            <AppBar position="static">
                <Tabs
                    value={ this.getIndex() }
                    onChange={ this.onIndexSelect }
                    indicatorColor="secondary"
                    textColor="secondary"
                    centered={ width !== 'xs' }
                    variant={ width === 'xs' ? 'scrollable' : null }
                    scrollButtons="auto"
                >
                    <Tab label="All" />
                    {
                        muscles.map(muscle => (
                            <Tab key={ muscle } label={ muscle } />
                        ))
                    }
                </Tabs>
            </AppBar>
        );
    }
}

export default withContext(withWidth()(Footer));