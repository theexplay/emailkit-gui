import React from 'react';
import Icon from '../Icon/Icon';

class Header extends React.Component {
    render() {
        return (
            <header className="Header">
                <Icon className="Header__logo" name="emailKit"/>

            </header>
        )
    }
}

export default Header;
