import React from 'react';
import { AppBar, Tabs, Tab, withWidth } from '@material-ui/core';

export default withWidth()(({ muscles, category, onSelect, width }) => {
    const index = category
        ? muscles.findIndex(muscle => muscle === category) + 1
        : 0;

    const onIndexSelect = (event, index) => onSelect(index === 0 ? '' : muscles[index - 1]);

    return (
        <AppBar position="static">
            <Tabs
                value={ index }
                onChange={ onIndexSelect }
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
});