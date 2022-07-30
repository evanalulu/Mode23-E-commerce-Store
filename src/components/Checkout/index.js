import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from './../../redux/Cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router'; 
import './styles.scss';

import Button from './../forms/Button';
import Item from './Item';

const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

const Checkout = ({}) => {
    const { cartItems, total } = useSelector(mapState);
    const history = useHistory();

    return (
        <div className='checkout'>
            <h1>
                Checkout
            </h1>

            <div className='cart'>
                {cartItems.length > 0? (
                <table border='0' cellPadding='0' cellSpacing='0'>
                    <tbody>
                        
                        <tr>
                            <table className='checkoutHeader' border='0' cellPadding='0' cellSpacing='0'>
                                <tbody>
                                    <tr>
                                        <th>
                                            Product
                                        </th>
                                        <th>
                                            Name
                                        </th>
                                        <th>
                                            Price
                                        </th>
                                        <th>
                                            Quantity
                                        </th>
                                        <th>
                                            Remove
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </tr>

                        <tr>
                            <table border='0' cellPadding='0' cellSpacing='0'>
                                <tbody>
                                    {cartItems.map((item, position) => {
                                        return (
                                            <tr key={position}>
                                                <td>
                                                    <Item {...item} />
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </tr>

                        <tr>
                            <table align='left' border='0' cellSpacing='0' cellPadding='10'>
                                <tr align='left'>
                                    <td>
                                        <h3>
                                            Total: Rs. {total}
                                        </h3>
                                    </td>
                                </tr>
                            </table>
                        </tr>

                        <tr>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Button onClick={()=> history.push('/search')}>
                                                Continue Shopping
                                            </Button>
                                        </td>
                                        <td>
                                            <Button onClick={()=> history.push('/checkout')}>
                                                Check Out
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </tr>

                    </tbody>
                </table>
                ) : (
                    <p>
                        You have not added any items in your cart.
                    </p>
                )}
            </div>
        </div>
    );
}

export default Checkout;
