import React from 'react';

const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(item => {
            return (
                <li key={item}>
                    {item}: {props.ingredients[item]}
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
            <p>Continue to Checkout?</p>
            <button onClick={props.purchaseCancelled}>CANCEL</button>
            <button onClick={props.purchaseContinued}>CONTINUE</button>
        </React.Fragment>
    );
};

export default orderSummary;