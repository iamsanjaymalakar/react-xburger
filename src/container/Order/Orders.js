import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import Spinner from '../../UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandle';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }

    render() {
        let orders = (<div>
            {this.state.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ))}
        </div>)
        if (this.state.loading) {
            orders = <Spinner />
        }
        return (
            <React.Fragment>{orders}</React.Fragment>
        );
    }
}

export default withErrorHandler(Orders, axios);