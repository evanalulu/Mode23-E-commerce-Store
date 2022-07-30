import React, { useEffect} from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductStart, setProduct } from './../../redux/Products/products.actions';
import { addProduct } from './../../redux/Cart/cart.actions'
import Button from './../forms/Button';
import './styles.scss';

const mapState = state => ({
    product: state.productsData.product
});

const ProductCard = ({}) => {
    const dispatch = useDispatch();
    const { productID } = useParams();
    const { product } = useSelector(mapState);

    const {
        productThumbnail,
        productName,
        productPrice,
        productDescription
    } = product;

    useEffect(() => {
        dispatch(
            fetchProductStart(productID)
        )

        return () => {
            dispatch(
                setProduct({})
            )
        }
    }, []);

    const configAddToCartBtn = {
        type: 'button'
    }

    const handleAddToCart = (product) => {
        if (!product) return;
        dispatch(
            addProduct(product)
        )
    }

    return (
        <div className='productCard'>
            <div className='thumb'>
                <img src={productThumbnail} />
            </div>
            <div className='productDetails'>
                <ul>
                    <li>
                        <h1>
                            {productName}
                        </h1>
                    </li>
                    <li>
                        <span>
                            Rs. {productPrice}
                        </span>
                    </li>
                    <li>
                        <div className='addToCart'>
                            <Button {...configAddToCartBtn} onClick={()=>handleAddToCart(product)}>
                                Add to cart
                            </Button> 
                        </div>
                    </li>
                    <li>
                    <span dangerouslySetInnerHTML={{ __html: productDescription }} />
                    </li>
                </ul>

            </div>
        </div>
    );
}

export default ProductCard;
