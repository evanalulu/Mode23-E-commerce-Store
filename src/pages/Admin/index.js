import React, { useState, useEffect } from 'react';
import Modal from './../../components/Modal';
import LoadMore from './../../components/LoadMore';
import { useDispatch, useSelector } from 'react-redux';
import { addProductStart, fetchProductsStart, deleteProductStart } from '../../redux/Products/products.actions';
import FormInput from './../../components/forms/FormInput';
import FormSelect from './../../components/forms/FormSelect';
import Button from './../../components/forms/Button';
import {CKEditor} from 'ckeditor4-react';
import './styles.scss';

const mapState = ({ productsData }) => ({
  products: productsData.products
});

const Admin = props => {

  const { products } = useSelector(mapState);
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState('arcade');
  const [productName, setProductName] = useState('');
  const [productThumbnail, setProductThumbnail] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDescription] = useState('');

  const { data, queryDoc, isLastPage } = products;

  const dispatch = useDispatch ();
  const toggleModal = () => setHideModal(!hideModal);

  useEffect(() => {
    dispatch(
      fetchProductsStart()
    );
  }, []);

  const configModal = {
    hideModal,
    toggleModal
  };

  const resetForm = () => {
    setHideModal(true);
    setProductCategory('arcade');
    setProductName('');
    setProductPrice(0);
    setProductThumbnail('');
    setProductDescription('');
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log('works');
    dispatch(
      addProductStart({
        productCategory,
        productName,
        productThumbnail,
        productPrice,
        productDescription
      })
     );
     resetForm();
  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistData: data
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvent: handleLoadMore,
  };

  return (
    <div className="admin">

      <div className="callToActions">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>
              Add new product
            </Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>

            <h2>
              Add new product
            </h2>

            <FormSelect
              label="Category"
              options={[{
                value: 'arcade',
                name: 'Aarcade 2051'
              }, {
                value: 'natsu',
                name: 'Natsukashii'
              }, {
                  value: 'waterm',
                  name: 'Watermelon Sugar'
              }, {
                  value: 'hireath',
                  name: 'Hireath'
              }]}
              handleChange={e => setProductCategory(e.target.value)}
            />

            <FormInput
              label="Name"
              type="text"
              value={productName}
              handleChange={e => setProductName(e.target.value)}
            />

            <FormInput
              label="Main image URL"
              type="url"
              value={productThumbnail}
              handleChange={e => setProductThumbnail(e.target.value)}
            />

            <FormInput
              label="Price"
              type="number"
              min="0"
              max="10000"
              step="0.01"
              value={productPrice}
              handleChange={e => setProductPrice(e.target.value)}
            />

            <CKEditor 
              onChange={evt => setProductDescription(evt.editor.getData())}
            />

            <br />

            <Button type="submit">
              Add product
            </Button>

          </form>
        </div>
      </Modal>

      <div className='manageProducts'>
        <table border='0' cellPadding='0' cellSpacing='0'>
          <tbody>
            <tr>
              <th>
                <h1>
                  Manage products
                </h1>
              </th>
            </tr>
            <tr>
              <td>
                <table className='results' border='0' cellPadding='0' cellSpacing='10'>
                  <tbody>
                    {(Array.isArray(data) && data.length > 0) && data.map((product, index) => {
                      const {
                        productName,
                        productThumbnail,
                        productPrice,
                        documentID
                      } = product;
                      return (
                        <tr key = {index}> 
                          <td>
                            <img  className='thumb' src={productThumbnail}/>
                          </td>
                          <td>
                            {productName}
                          </td>
                          <td>
                            Rs. {productPrice}
                          </td>
                          <td>
                            <Button onClick={() => dispatch(deleteProductStart(documentID))}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
          
            <tr>
              <td>

              </td>
            </tr>

            <tr>
              <td>
                <table border='0' cellPadding='0' cellSpacing='0'>
                  <tbody>
                    <tr>
                      <td>
                        {!isLastPage && (
                          <LoadMore {...configLoadMore} />
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Admin;
