import React from 'react';

class NotFound extends React.Component {
    render() {
        return (
            <div className="NotFound">
                <h1 className="NotFound__title">404</h1>
                <p className="NotFound__text">Такой страницы не существует</p>
            </div>
        )
    }
}

export default NotFound;
