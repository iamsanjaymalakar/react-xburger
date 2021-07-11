import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';
import axios from '../../axios-orders';
import classes from './ContactData.module.css';
import withErrorHandler from '../../hoc/withErrorHandle';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../utils/utils';

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            type: 'input',
            config: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            type: 'input',
            config: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            type: 'input',
            config: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 4,
                maxLength: 5,
                isNumeric: true
            },
            valid: false,
            touched: false
        },
        country: {
            type: 'input',
            config: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            type: 'input',
            config: {
                type: 'email',
                placeholder: 'Your E-mail'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            type: 'select',
            config: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true
        }
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const inputChangedHandler = (event, key) => {
        const updatedFormElement = updateObject(orderForm[key], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[key].validation),
            touched: true,
        });
        const updatedOrderForm = updateObject(orderForm, {
            [key]: updatedFormElement
        });
        let formIsValid = true;
        for (let key in updatedOrderForm) {
            formIsValid = updatedOrderForm[key].valid && formIsValid;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    }

    const orderHandler = event => {
        event.preventDefault();
        const formData = {};
        for (let key in orderForm) {
            formData[key] = orderForm[key].value;
        }
        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: formData,
            userId: props.userId
        }
        props.onOrderBurger(order, props.token);
    }

    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(element => (
                <Input
                    key={element.id}
                    type={element.config.type}
                    config={element.config.config}
                    value={element.config.value}
                    invalid={!element.config.valid}
                    shouldValidate={element.config.validation}
                    touched={element.config.touched}
                    changed={(event) => inputChangedHandler(event, element.id)} />
            ))}
            <Button type="Success" disabled={!formIsValid}>ORDER</Button>
        </form>
    );
    if (props.loading) {
        form = <Spinner />;
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));