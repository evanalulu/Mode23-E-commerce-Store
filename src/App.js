import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import { auth, handleUserProfile } from './firebase/utils'
import { checkUserSession } from './redux/User/user.actions'; 
import {  useDispatch } from 'react-redux';


import './default.scss';

import AdminTool from './components/AdminTool';

import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import CheckoutP from './pages/CheckoutP';

import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
import AdminLayout from './layouts/AdminLayout';


import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';
import Product from './components/ProductRes/Product';

const App = props => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className="App">
      <AdminTool />
        <Switch>
          <Route exact path="/" render = {() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )} />

          <Route exact path='/search' render={() => (
            <MainLayout>
              <Search />
            </MainLayout>
          )} />

          <Route  path='/search/:filterType' render={() => (
            <MainLayout>
              <Search />
            </MainLayout>
          )} />

          <Route  path='/product/:productID' render={() => (
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          )} />

          <Route  path='/cart' render={() => (
            <MainLayout>
              <Cart />
            </MainLayout>
          )} />
  
          <Route path="/registration" render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )} />
  
          <Route path ="/login" 
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )} />

          <Route path="/recovery" 
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )} />

          <Route path="/checkout" 
            render={() => (
                <MainLayout>
                  <CheckoutP />
                </MainLayout> 
          )} />

          <Route path="/admin" 
          render={() => (
            <WithAdminAuth>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </WithAdminAuth>
          )} />

        </Switch>
      </div>
    ); 
}

export default App;
