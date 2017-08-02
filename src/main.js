import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { BrowserHistory } from 'react-history';

/*
 * Import components
 * */

import NotFound from './modules/NotFound/NotFound';
// import StorePicker from './components/StorePicker';
// import App from './components/App';



/*
 * Routes
 * */

const routes = (
  <Router history={BrowserHistory()}>
    {/*<Route path="/" component={StorePicker}/>*/}
    {/*<Route path="/store/:storeId" component={App}/>*/}
    <Route path="*" component={NotFound}/>
  </Router>
);


ReactDOM.render(routes, document.querySelector('#main'));
