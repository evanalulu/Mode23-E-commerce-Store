import React from 'react';
import './styles.scss';
import Button from '../forms/Button';
import FormInput from '../forms/FormInput';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import StripeCheckout from 'react-stripe-checkout';
import { selectCartTotal, selectCartItemsCount } from './../../redux/Cart/cart.selectors';
import { useState } from 'react';
import axios from 'axios';

const mapState = createStructuredSelector({
    total: selectCartTotal,
    itemCount: selectCartItemsCount
  });
  
const CheckoutPay = ({}) => {
        
        const { total, itemCount } = useSelector(mapState);
        const dispatch = useDispatch();
        const [nameOnCard, setNameOnCard] = useState('');
        const [shippingAddress, setShippingAddress] = useState('');
        const [city, setCity] = useState('');
        const [state, setState] = useState('');
        const [postal, setPostal] = useState('');
        const [country, setCountry] = useState('Nepal');

        async function handleToken(token, address) {
            const response = await axios.post('http://localhost:5000/checkout', {token, total})

            console.log(response.status)
        }
    
    return (
        <div className="paymentDetails">
            <form>
                <div className="group">
                    <h2>
                        Shipping Address
                    </h2>

                <FormInput
                    required
                    placeholder="Name on Card"
                    name="nameOnCard"
                    handleChange={e => setNameOnCard(e.target.value)}
                    value={nameOnCard}
                    type='text'
                />

                <div className="formRow checkoutInput">
                    <select>
                        <option>
                            Nepal
                        </option>
                        <option>
                            United States of America
                        </option>
                        <option>
                            India
                        </option>
                        <option>
                            United Kingdom
                        </option>
                    </select>
                </div>

                <FormInput
                    placeholder="Shipping address"
                    name="shippingAddress"
                    handleChange={e => setShippingAddress(e.target.value)}
                    value={shippingAddress}
                    type="text"
                />

                <FormInput
                    required
                    placeholder="City"
                    name="city"
                    handleChange={e => setCity(e.target.value)}
                    value={city}
                    type="text"
            />

            <FormInput
                required
                placeholder="State"
                name="state"
                handleChange={e => setState(e.target.value)}
                value={state}
                type="text"
            />

            <FormInput
                required
                placeholder="Postal Code"
                name="postal"
                handleChange={e => setPostal(e.target.value)}
                value={postal}
                type="text"
            />

            <br/>
            <h5 className='or'>OR</h5>
        
            <StripeCheckout 
                className='payBtn'
                stripeKey='pk_test_51KTUkmAWz0nFYQqCc9ZFdZyNXj9u86i4tgq0gT2LKwvmscVSBBfLKXjMzYBgy2kPGqDU7RFRLshkaAHnRJsnmGEB00QUn996ui'
                token={handleToken}
                amount={total}
                shippingAddress
                name={nameOnCard}
            />
                

                </div>
            </form>
    </div>
  );
};

export default CheckoutPay;
