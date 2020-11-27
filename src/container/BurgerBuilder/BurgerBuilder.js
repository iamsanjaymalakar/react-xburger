import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerBuildControls from '../../components/Burger/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Spinner from '../../UI/Spinner/Spinner'
import axios from '../../axios-orders';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('ingredients.json')
            .then(res => {
                this.setState({
                    ingredients: res.data
                });
            }).catch(err => {
                this.setState({
                    error: true
                })
            })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(item => {
                return ingredients[item];
            })
            .reduce((sum, element) => {
                return sum + element;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = type => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] + 1;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = oldCount - 1;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&')
        });
        return;
        this.setState({
            loading: true
        })
        axios.post('orders.json', {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Sanjay',
                address: {
                    street: 'Random',
                    zipCode: '5000',
                    country: 'Bangladesh'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }).then(res => {
            this.setState({
                purchasing: false,
                loading: false
            });
        }).catch(err => {
            console.log(err);
            this.setState({
                purchasing: false,
                loading: false
            });
        });
    }

    render() {
        console.log(this.props);
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {this.state.loading ? <Spinner /> :
                        this.state.ingredients && <OrderSummary
                            ingredients={this.state.ingredients}
                            purchaseCancelled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler} />}
                </Modal>
                {this.state.ingredients ?
                    (<React.Fragment>
                        <Burger ingredients={this.state.ingredients} />
                        <BurgerBuildControls
                            ingredientAdded={this.addIngredientHandler}
                            ingredientRemoved={this.removeIngredientHandler}
                            disabled={disabledInfo}
                            purchasable={this.state.purchasable}
                            price={this.state.totalPrice}
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

export default BurgerBuilder;