import React from 'react';
import PropTypes from "prop-types";


const Button = (props) => {
    return (
        <div>
            <button className='btn' onClick={props.onclick} style={{backgroundColor: props.color}}>{props.text}</button>
        </div>
    );
};

Button.defaultProps = {
    color: 'green',
    text: 'Default text'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onclick: PropTypes.func.isRequired
};

export default Button;
