import {useRef, useState} from 'react';

enum Operadores {
  sumar,
  restar,
  multiplicar,
  dividir,
}

export const useCalculadora = () => {
  const [numero, setNumero] = useState('0');
  const [anterior, setAnterior] = useState('0');
  const ultimaOperacion = useRef<Operadores>();

  const limpiar = () => {
    setNumero('0');
    setAnterior('0');
  };

  const armar = (text: string) => {
    // verificar si hay decimal
    if (numero.includes('.') && text === '.') return;

    if (numero.startsWith('0') || numero.startsWith('-0')) {
      if (text === '.') {
        // es el punto decimal? 0.algo
        setNumero(numero + text);
      } else if (text === '0' && numero.includes('.')) {
        // evaluar si es otro cero y hay punto 0.0000
        setNumero(numero + text);
      } else if (text !== '0' && !numero.includes('.')) {
        // evaluar si es diferente de cero y no tiene punto 0 -> 2
        setNumero(text);
      } else if (text === '0' && !numero.includes('.')) {
        setNumero(numero);
      } else {
        setNumero(numero + text);
      }
    } else {
      setNumero(numero + text);
    }
  };

  const cambiarSigno = () => {
    if (numero === '0') {
      return;
    }
    if (numero.includes('-')) {
      setNumero(numero.replace('-', ''));
    } else {
      setNumero('-' + numero);
    }
  };

  const cambiarAnterior = () => {
    if (numero.endsWith('.')) {
      setAnterior(numero.slice(0, -1));
    } else {
      setAnterior(numero);
    }
    setNumero('0');
  };

  const botonDel = () => {
    if (numero.length === 1 || (numero.length === 2 && numero.includes('-'))) {
      setNumero('0');
    } else {
      setNumero(numero.slice(0, -1));
    }
  };

  const botonDiv = () => {
    cambiarAnterior();
    ultimaOperacion.current = Operadores.dividir;
  };

  const botonMult = () => {
    cambiarAnterior();
    ultimaOperacion.current = Operadores.multiplicar;
  };
  const botonSumar = () => {
    cambiarAnterior();
    ultimaOperacion.current = Operadores.sumar;
  };
  const botonRestar = () => {
    cambiarAnterior();
    ultimaOperacion.current = Operadores.restar;
  };

  const calcular = () => {
    const num1 = Number(numero);
    const num2 = Number(anterior);

    switch (ultimaOperacion.current) {
      case Operadores.sumar:
        setNumero(String(num1 + num2));
        break;
      case Operadores.restar:
        setNumero(String(num2 - num1));
        break;
      case Operadores.multiplicar:
        setNumero(String(num1 * num2));
        break;
      case Operadores.dividir:
        if (num1 === 0) {
          setNumero('No se puede dividir entre 0');
          break;
        }

        setNumero(String(num2 / num1));
        break;
    }
    setAnterior('0');
  };

  return {
    numero,
    anterior,
    limpiar,
    armar,
    cambiarSigno,
    botonDel,
    botonDiv,
    botonMult,
    botonSumar,
    botonRestar,
    calcular,
  };
};
