import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandle';
import * as actions from '../../store/actions/index';

const Orders = props => {
    const { onFetchOrders, token, userId } = props;
    useEffect(() => {
        onFetchOrders(token, userId);
    }, [onFetchOrders, token, userId]);

    let orders = (<div>
        {props.orders.map(order => (
            <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price} />
        ))}
    </div>)
    if (props.loading) {
        orders = <Spinner />
    }
    return (
        <React.Fragment>
            {orders}
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));