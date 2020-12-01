import React from 'react';
import Button from '../../UI/Button/Button';

const capitalize = s => s[0].toUpperCase() + s.slice(1);

const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(item => {
            return (
                <li key={item}>
                    {capitalize(item)}: {props.ingredients[item]}
                </li>
            );
        });

    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button type='Danger' clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button type='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
        </React.Fragment>
    );
};

export default orderSummary;