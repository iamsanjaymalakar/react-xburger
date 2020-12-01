import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BurgerBuildControls from '../../components/Burger/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Spinner from '../../UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandle'
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    // componentDidMount() {
    //     axios.get('ingredients.json')
    //         .then(res => {
    //             this.setState({
    //                 ingredients: res.data
    //             });
    //         }).catch(err => {
    //             this.setState({
    //                 error: true
    //             })
    //         })
    // }

    isPurchasable() {
        const sum = Object.keys(this.props.ingredients)
            .map(item => {
                return this.props.ingredients[item];
            })
            .reduce((sum, element) => {
                return sum + element;
            }, 0);
        return sum > 0;
    }


    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push({
            pathname: '/checkout',
        });
    }

    render() {

        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {this.state.loading ? <Spinner /> :
                        <OrderSummary
                            ingredients={this.props.ingredients}
                            price={this.props.price}
                            purchaseCancelled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler} />}
                </Modal>
                {this.props.ingredients ?
                    (<React.Fragment>
                        <Burger ingredients={this.props.ingredients} />
                        <BurgerBuildControls
                            ingredientAdded={this.props.onIngredientAdded}
                            ingredientRemoved={this.props.onIngredientRemoved}
                            disabled={disabledInfo}
                            purchasable={this.isPurchasable()}
                            price={this.props.price}
                            onOrder={this.purchaseHandler} />
                    </React.Fragment>) :
                    (this.state.error ?
                        <div style={{ textAlign: 'center' }}>
                            <h1>Ingredients can't be loaded!</h1>
                        </div> :
                        <Spinner />)}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingredientName
        }),
        onIngredientRemoved: (ingredientName) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingredientName
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));