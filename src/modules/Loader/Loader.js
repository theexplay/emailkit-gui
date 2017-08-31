import React from 'react';

class Loader extends React.Component {
    constructor() {
        super();
        console.log(123)
    }

    render() {
        return (
            <div className="Loader">
                <div className="Loader__icon"></div>
            </div>
        )
    }
}

export default Loader;
