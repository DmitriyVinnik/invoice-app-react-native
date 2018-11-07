import React from 'react';
import {BrowserRouter as Router, Route, Switch, NavLink, Redirect} from "react-router-dom";
import '../../styles/style.scss';

import Toast from '../Toast';
import CustomersPage from '../pages/customers/CustomersPage/index';
import ProductsPage from '../pages/products/ProductsPage/index';
import InvoicesPage from '../pages/invoices/InvoicesPage';
import NotFoundPage from '../pages/NotFoundPage';

const App: React.SFC = () => {
    return (
        <Router>
            <div>
                <header className='page-header'>
                    <nav className='main-nav'>
                        <Toast/>
                        <ul className='main-nav__list'>
                            <li className='main-nav__item'>
                                <NavLink
                                    to="/invoices"
                                    className='main-nav__link'
                                    activeClassName='main-nav__link--active'
                                >
                                    Invoices
                                </NavLink>
                            </li>
                            <li className='main-nav__item'>
                                <NavLink
                                    to="/customers"
                                    className='main-nav__link'
                                    activeClassName='main-nav__link--active'
                                >
                                    Customer
                                </NavLink>
                            </li>
                            <li className='main-nav__item'>
                                <NavLink
                                    to="/products"
                                    className='main-nav__link'
                                    activeClassName='main-nav__link--active'
                                >
                                    Products
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main className='main-page'>
                    <Switch>
                        <Redirect exact from='/' to='/invoices'/>
                        <Route path="/invoices" component={InvoicesPage}/>
                        <Route path="/customers" component={CustomersPage}/>
                        <Route path="/products" component={ProductsPage}/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                </main>
            </div>
        </Router>
    );
};

export default App;