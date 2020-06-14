import React from 'react';
import Toolbar from '../../components/Navigation/Toolbar';
import classes from './Layout.module.css';

const layout = props => (
    <React.Fragment>
        <Toolbar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </React.Fragment>
);

export default layout;