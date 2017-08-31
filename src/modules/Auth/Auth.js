import React from 'react';
import firebase from 'firebase';
import Icon from '../Icon/Icon';
import { PATHS } from '../_common/_common';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';

export default class Auth extends React.Component {

    constructor() {
        super();
        this.state = {redirect: false};
    }

    isAuthenticated() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const email = user.email;
                const id = user.uid;
                console.info(`User is signed in. Email: ${email}. ID: ${id}`);
                return true;
            } else {
                console.info('User is signed out');
                return false;
            }
        });
    }

    submitForm(event) {
        const _this = this;
        this.refs.button.classList.add('Button_disabled', 'Button_loading');
        this.refs.button.setAttribute('disabled', 'disabled');
        event.preventDefault();

        firebase.auth().signInWithEmailAndPassword(this.refs.mail.value, this.refs.pass.value)
            .then((res) => {
                console.log(res);
                _this.state.redirect = true;
                _this.forceUpdate();
            })
            .catch((error) => {
            alert(error.message);
        });
    }

    handleChange() {
        const button = this.refs.button;

        if (!!this.refs.mail.value && !!this.refs.pass.value) {
            button.classList.remove('Button_disabled');
            button.removeAttribute('disabled');
        } else {
            button.classList.add('Button_disabled');
            button.setAttribute('disabled', 'disabled');
        }
    }

    parallax(e) {
        const [x, y] = [e.pageX, e.pageY];
        const [w, h] = [window.innerWidth / 2, window.innerHeight / 2];
        const [offsetX, offsetY] = [w - x, h - y];

        this.refs.parallax__1.style.transform = `translate3d(${offsetX / 5}px, ${offsetY / -2}px, 0)`;
    }

    render() {

        if (this.state.redirect) {
            return (
                <Redirect to={PATHS.CONSTRUCTOR} />
            )
        }

        return (
            <div className="Auth" onMouseMove={this.parallax.bind(this)}>
                <div ref="parallax__1" className="Auth__parallax">
                    <Icon name='emailKit' className="Modal__logo" />
                </div>
                <div ref="parallax__2" className="Auth__parallax">
                    <div className="Modal Modal_auth">
                        <div  className="Modal__container">
                            <div className="Modal__header">
                                Авторизация
                            </div>
                            <div className="Modal__content" autoComplete="off">
                                <form className="Modal__form Form" onSubmit={this.submitForm.bind(this)}>
                                    <input name="mail" ref="mail" defaultValue="" type="text" autoComplete="false" className="Form__input" placeholder="Ваша почта" onChange={this.handleChange.bind(this)}/>
                                    <input name="pass" ref="pass" defaultValue="" type="password" autoComplete="false" className="Form__input" placeholder="Пароль" onChange={this.handleChange.bind(this)}/>
                                    <input type="submit" ref="button" className="Button Button_disabled Form__button" value="Войти на сайт" disabled="disabled"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

