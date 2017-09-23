import React from 'react';
import Icon from '../Icon/Icon';

class Header extends React.Component {
    render() {
        return (
            <header className="Header">
                <Icon className="Header__logo" name="emailKit"/>
                <div className="Header__menu">
                    <div className="Header__menu-item active">Build</div>
                    <div className="Header__menu-item">Test send</div>
                    <div className="Header__menu-item">Preview</div>
                    <div className="Header__menu-item">Code</div>
                </div>
            </header>
        )
    }
}

export default Header;
