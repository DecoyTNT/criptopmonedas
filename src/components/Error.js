import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const MensajeError = styled.p`
    background-color: #b7322c;
    padding: 1rem;
    color: white;
    font-size: 30px;
    text-transform: uppercase;
    font-weight: bold;
    font-family: 'Bebas Neue', cursive;
    text-align: center;
    border-radius: 20px;
`;

const Error = ({ mensaje }) => {
    return (
        <MensajeError>{mensaje}</MensajeError>
    );
}

Error.propTypes = {
    mensaje: PropTypes.string.isRequired
}

export default Error;