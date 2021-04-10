import React from 'react';
import Footer from './Footer';
import Customer from './Customer';
import Navigation from './Navigation';
import Men from './Men'
import Women from './Women'
import Home from './Home'
import ProductDisplay from './ProductDisplay';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Product from './Product';
import Admin from './Admin'
import Allcategories from './Admin/Allcategories';
import Allproducts from './Admin/Allproducts';
import Addnewproduct from './Admin/AddNewProduct'
import Signup from './Signup';
import Login from './Login'
import Cart from './Cart'
import User from './Admin/User'
import Orders from './Admin/Orders'
import OrderDisplay from './Admin/OrderDisplay'
import Search from './Search'
import SearchDisplay from './SearchDisplay'
import Profile from './Profile';


function App() {
    return (
        <Router>
            <div>
                <Navigation />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/men' exact component={Men} />
                    <Route path='/men/:id' component={ProductDisplay} />
                    <Route path='/women' component={Women} />
                    <Route path='/admin' component={Admin} />
                    <Route path='/allproducts' component={Allproducts} />
                    <Route path='/allcategories' component={Allcategories} />
                    <Route path='/addnewproduct' component={Addnewproduct} />
                    <Route path='/signup' component={Signup} />
                    <Route path='/login' component={Login} />
                    <Route path='/cart' component={Cart} />
                    <Route path='/users' component={User} />
                    <Route path='/orders' exact component={Orders} />
                    <Route path='/orders/:id' component={OrderDisplay} />
                    <Route path='/search' component={Search} />
                    <Route path='/search/:query' component={SearchDisplay} />
                    <Route path='/profile/' component={Profile} />
                </Switch>
            </div>
        </Router>
    )
}
export default App;