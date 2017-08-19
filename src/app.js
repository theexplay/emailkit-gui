import React from 'react';
import {render} from 'react-dom'
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import App from './modules/App/App';
import NotFound from './modules/NotFound/NotFound';
import Core from './modules/Core/Core';


const Root = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={App}/>
            <Route path="/will-match" component={Core}/>
            <Route component={NotFound}/>
        </Switch>
    </Router>
);

render(<Root />, document.getElementById('root'));
