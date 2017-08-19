import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header className="Header">
                <input type="text" className="Header__search"/>
            </header>
        )
    }
}

export default Header;