import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Axios from 'axios';
import Error from './Error';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`;

const Formulario = ({ setMoneda, setCriptomoneda }) => {

    const [criptomonedas, setCriptomonedas] = useState([]);

    const [error, setError] = useState(false);

    const monedas = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ];

    const [moneda, SelectMoneda] = useMoneda('Elige tu moneda', '', monedas);

    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda', '', criptomonedas);

    useEffect(() => {
        const consultarAPI = async () => {

            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await Axios.get(url);

            setCriptomonedas(resultado.data.Data);

        }
        consultarAPI();
    }, []);


    const cotizarMoneda = e => {
        e.preventDefault();

        if (moneda.trim() === '' || criptomoneda.trim() === '') {
            return setError(true);
        }
        setError(false);

        setMoneda(moneda);
        setCriptomoneda(criptomoneda);

    };

    return (
        <form
            onSubmit={cotizarMoneda}
        >

            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <SelectMoneda />
            <SelectCripto />

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>

    );
}

Formulario.propTypes = {
    setMoneda: PropTypes.func.isRequired,
    setCriptomoneda: PropTypes.func.isRequired
}


export default Formulario;