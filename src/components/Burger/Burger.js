import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient';

const Burger = props => {
    let variableIngredients = Object.keys(props.ingredients)
        .map(item => {
            return [...Array(props.ingredients[item])]
                .map((_, index) => {
                    return <BurgerIngredient key={item + index} type={item} />;
                });
        }).reduce((array, element) => {
            return array.concat(element);
        }, [])
    if (!variableIngredients.length)
        variableIngredients = <p>Please start adding ingredients!</p>
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {variableIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
}

export default Burger;