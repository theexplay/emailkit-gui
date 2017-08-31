import React from 'react';
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import firebase from 'firebase';
import { PATHS } from './modules/_common/_common';
import App from './modules/App/App';
import NotFound from './modules/NotFound/NotFound';
import Constructor from './modules/Constructor/Constructor';

// Firebase config
const config = {
    apiKey: "AIzaSyAJOkOBrpdewGOTp314W0ZPedGEJq8wuzQ",
    authDomain: "emailkit-e81b3.firebaseapp.com",
    databaseURL: "https://emailkit-e81b3.firebaseio.com",
    projectId: "emailkit-e81b3",
    storageBucket: "emailkit-e81b3.appspot.com",
    messagingSenderId: "393565312046"
};



firebase.initializeApp(config);

const Root = () => (
    <Router>
        <Switch>
            <Route path={PATHS.HOME} exact component={App}/>
            <Route path={PATHS.CONSTRUCTOR} component={Constructor} />
            <Route component={NotFound}/>
        </Switch>
    </Router>
);

render(<Root />, document.getElementById('root'));
