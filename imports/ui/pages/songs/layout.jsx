import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    // Prop validation (it's not enforced)
    content: PropTypes.func.isRequired
};

export default class Layout extends React.Component {

    constructor (props) {
        super(props);
        this.state = {}
    }

    render () {
        return (
            <div style={styles.container}>
                {this.props.content()}
            </div>
        )
    }

}

const styles = {
    container: {
        paddingTop: 60,
        maxWidth: 600,
        margin: '0 auto 0 auto'
    }
};

Layout.propTypes = propTypes;
