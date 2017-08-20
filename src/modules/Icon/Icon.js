import React from 'react';
import PropTypes from 'prop-types';

class Icon extends React.Component {
    render() {
        return (
            <i className={`Icon ${!!this.props.className ? this.props.className: null} Icon_${this.props.name}`} />
        )
    }
}

Icon.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired
};

export default Icon;
