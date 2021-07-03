import React from 'react';
import NavigationItem from './NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Sign In</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;