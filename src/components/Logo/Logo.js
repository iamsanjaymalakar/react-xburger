import React from 'react';
import burgerLogo from '../../assets/images/burger_logo.png';
import classes from './Logo.module.css';

const logo = props => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="XBurger" />
    </div>
);

export default logo;