import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';
import Auth from './hoc/auth';

//private pages
import UserDashboard from './components/User';

//public pages
import Home from './components/Home';
import RegisterLogin from './components/Register_login';
import Register from './components/Register_login/register';
import Shop from './components/Shop';
import AddProduct from './components/User/Admin/add_product'


const Routes = () =>{
  return(
    <Layout>
      <Switch>
        {/* private */}
        <Route path="/admin/add_product" exact component={Auth(AddProduct, true)} />
        <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)} />
        {/* public */}
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/register_login" exact component={Auth(RegisterLogin, false)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/" exact component={Auth(Home, null)} />
      </Switch>
    </Layout>

  )
}


export default Routes;
