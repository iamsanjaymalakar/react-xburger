import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl';

// const controls = [
//     { label: 'Salad', type: 'salad' },
//     { label: 'Bacon', type: 'bacon' },
//     { label: 'Cheese', type: 'cheese' },
//     { label: 'Meat', type: 'meat' },
// ];
const controls = ['Salad', 'Bacon', 'Cheese', 'Meat'];
const buildControls = props => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(item => (
                <BuildControl
                    key={item}
                    label={item}
                    added={() => props.ingredientAdded(item.toLocaleLowerCase())}
                    removed={() => props.ingredientRemoved(item.toLocaleLowerCase())}
                    disabled={props.disabled[item.toLocaleLowerCase()]}
                />
            ))}
            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.onOrder}>ORDER NOW</button>
        </div>
    );
}

export default buildControls;