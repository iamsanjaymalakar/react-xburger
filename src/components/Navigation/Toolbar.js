import React from 'react';
import Logo from '../Logo/Logo';
import classes from './Toolbar.module.css';

const toolbar = props => (
    <header className={classes.Toolbar}>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            Nav Nav Nav
        </nav>
    </header>
);

export default toolbar;