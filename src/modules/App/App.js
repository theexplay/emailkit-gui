import React from 'react';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Constructor from '../Constructor/Constructor';
import Auth from '../Auth/Auth';
import Loader from '../Loader/Loader';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';

class App extends React.Component {
    constructor() {
        super();
        this.state = {authorized: null};
        this.isAuthenticated();
    }

    isAuthenticated() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const email = user.email;
                const id = user.uid;
                this.setState({
                    authorized: true,
                    id,
                    email
                });
                console.info(`User is signed in. Email: ${email}. ID: ${id}`);
            } else {
                this.setState({authorized: false});
            }
        });
    }

    render() {
        return (
            <div className="App">
                {this.state.authorized === null ? <Loader/> : this.state.authorized ? <Redirect to={'/projects'}/> : <Auth/> }
            </div>
        )
    }
}

export default App;
