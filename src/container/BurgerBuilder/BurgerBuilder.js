import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BurgerBuildControls from '../../components/Burger/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Spinner from '../../UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandle'
import axios from '../../axios-orders';
import * as actions from '../../store/actions';


const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);

    const { onInitIngredients } = props;
    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const isPurchasable = () => {
        const sum = Object.keys(props.ingredients)
            .map(item => {
                return props.ingredients[item];
            })
            .reduce((sum, element) => {
                return sum + element;
            }, 0);
        return sum > 0;
    }


    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push({
            pathname: '/checkout',
        });
    }


    const disabledInfo = {
        ...props.ingredients
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
        <React.Fragment>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {props.ingredients && <OrderSummary
                    ingredients={props.ingredients}
                    price={props.price}
                    purchaseCancelled={purchaseCancelHandler}
                    purchaseContinued={purchaseContinueHandler} />}
            </Modal>
            {props.ingredients ?
                (<React.Fragment>
                    <Burger ingredients={props.ingredients} />
                    <BurgerBuildControls
                        ingredientAdded={props.onIngredientAdded}
                        ingredientRemoved={props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={isPurchasable()}
                        price={props.price}
                        onOrder={purchaseHandler}
                        isAuth={props.isAuthenticated} />
                </React.Fragment>) :
                (props.error ?
                    <div style={{ textAlign: 'center' }}>
                        <h1>Ingredients can't be loaded!</h1>
                    </div> :
                    <Spinner />)}
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));