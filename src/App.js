import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Axios from 'axios';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';


const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;

function App() {

  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {

    const cotizarCripto = async () => {
      if (moneda.trim() === '' || criptomoneda.trim() === '') return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const respuesta = await Axios.get(url);
      setCargando(true);

      setTimeout(() => {
        setCargando(false);
        setResultado(respuesta.data.DISPLAY[criptomoneda][moneda]);
      }, 1000);

    }
    cotizarCripto();

  }, [moneda, criptomoneda])

  return (
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt="imagen cripto"
        />
      </div>

      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>

        <Formulario
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda}
        />

        {!cargando ? <Cotizacion
          resultado={resultado}
        />
          :
          <Spinner />
        }


      </div>
    </Contenedor>
  );
}

export default App;
