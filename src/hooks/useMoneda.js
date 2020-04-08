import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Label = styled.label`
      font-family: 'Bebas Neue', cursive;
      color: #FFF;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 2.4rem;
      margin-top: 2rem;
      display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.5rem;
`;


const useMoneda = (label, initialState, opciones) => {

    // State de nuestro custom hook
    const [state, setState] = useState(initialState);


    const SelectMoneda = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e => setState(e.target.value)}
                value={state}
            >
                <option value="">-- Selecione --</option>
                {opciones.map(opcion => (
                    <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                ))}
            </Select>
        </Fragment>
    );

    return [state, SelectMoneda];
}

useMoneda.propTypes = {
    label: PropTypes.string.isRequired,
    initialState: PropTypes.string.isRequired,
    opciones: PropTypes.object.isRequired
}

export default useMoneda;