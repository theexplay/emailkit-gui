import React from 'react';
import PropTypes from 'prop-types';
import Components from '../Components/Components';

class Constructor extends React.Component {
    render() {
        return (
            <div className="Constructor">
                <div className="Constructor__sidebar">
                    <div className="Constructor__add-components">
                        <Components/>
                    </div>
                </div>
                <div className="Constructor__main">
                    <div className="Constructor__area">
                    </div>
                </div>
            </div>
        )
    }
}

export default Constructor;
