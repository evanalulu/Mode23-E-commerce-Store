import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { fetchProductsStart } from './../../redux/Products/products.actions';
import Product from './Product';
import FormSelect from '../forms/FormSelect';
import LoadMore from '../LoadMore';
import './styles.scss';

const mapState = ({ productsData }) => ({
  products: productsData.products
});

const ProductRes = ({ }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(
      fetchProductsStart({ filterType })
    )
  }, [filterType]);

  if (!Array.isArray(data)) return null;
  if (data.length < 1) {
    return (
      <div className="products">
        <p>
          No search results.
        </p>
      </div>
    );
  }

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    history.push(`/search/${nextFilter}`);
  }

  const configFilters = {
    defaultValue: filterType,
    options: [{
      name:'Show all',
      value: ''
    }, {
      name: 'Arcade 2051',
      value:'arcade'
    }, {
      name: 'Natsukashii',
      value: 'natsu'
    }, {
      name: 'Hireath',
      value: 'hireath'
    }, {
      name: 'Watermelon Sugar',
      value: 'waterm'
    }],
    handleChange: handleFilter
  };
  
  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({ 
        filterType, 
        startAfterDoc: queryDoc,
        persistData: data
       })
    )
  };

  const configLoadMore = {
    onLoadMoreEvent: handleLoadMore,
  };

  return (
    <div className="products">

      <h1>
        Browse Products
      </h1>

      <FormSelect {...configFilters} />

      <div className="productResults">
        {data.map((product, pos) => {
          const { productThumbnail, productName, productPrice } = product;
          if (!productThumbnail || !productName ||
            typeof productPrice === 'undefined') return null;

          const configProduct = {
            ...product
          };

          return (
            <Product {...configProduct} />
          );
        })}
      </div>

        {!isLastPage && (
          <LoadMore {...configLoadMore} />
        )}

    </div>
  );
};

export default ProductRes;
