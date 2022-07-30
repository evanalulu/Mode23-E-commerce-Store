import React from 'react';
import { useDispatch } from 'react-redux';
import { removeCartItem, addProduct, reduceCartItem } from '../../../redux/Cart/cart.actions';


const Item = (product) => {
    const {
        productName,
        productThumbail,
        productPrice,
        quantity,
        documentID
    } = product;

    const dispatch = useDispatch();

    const handleRemoveCartItem = (documentID) => {
        dispatch(
            removeCartItem({
                documentID
                }
            )
        );
    }

    const handleAddProduct = (product) => {
        dispatch(
            addProduct(product)
        );
    }

    const handleReduceCartItem = (product) => {
        dispatch(
            reduceCartItem(product)
        )
    }
    
    return (
        <table className='cartItem' border='0' cellPadding='0' cellSpacing='0'>
            <tbody>
                <tr>
                    <td>
                        <img src={productThumbail} />
                    </td>
                    <td>
                        {productName}
                    </td>
                    <td>
                        Rs. {productPrice}
                    </td>
                    <td>
                        <span className = 'cartBtn' onClick={() => handleReduceCartItem(product)}>
                            {`<`}
                        </span>
                        <span>
                            {quantity}
                        </span>
                        <span className = 'cartBtn' onClick={() => handleAddProduct(product)}>
                            {`>`}
                        </span>
                    </td>
                    <td>
                        <span className = 'cartBtn' onClick= {()=>handleRemoveCartItem(documentID)}>
                            X
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default Item;
