import React from 'react';
import {Text, View} from 'react-native';
import BotonCalc from '../components/BotonCalc';
import {styles} from '../theme/appTheme';
import {useCalculadora} from '../hooks/useCalculadora';

export const CalculadoraScreen = () => {
  const {
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
  } = useCalculadora();

  return (
    <View style={styles.container}>
      {anterior !== '0' && (
        <Text style={styles.resultadoPequeno}>{anterior}</Text>
      )}

      <Text style={styles.resultado} numberOfLines={1} adjustsFontSizeToFit>
        {numero}
      </Text>

      <View style={styles.fila}>
        <BotonCalc texto="C" color="#9b9b9b" accion={limpiar} />
        <BotonCalc texto="+/-" color="#9b9b9b" accion={cambiarSigno} />
        <BotonCalc texto="Del" color="#9b9b9b" accion={botonDel} />
        <BotonCalc texto="/" color="#ff9427" accion={botonDiv} />
      </View>
      <View style={styles.fila}>
        <BotonCalc texto="7" accion={armar} />
        <BotonCalc texto="8" accion={armar} />
        <BotonCalc texto="9" accion={armar} />
        <BotonCalc texto="X" color="#ff9427" accion={botonMult} />
      </View>
      <View style={styles.fila}>
        <BotonCalc texto="4" accion={armar} />
        <BotonCalc texto="5" accion={armar} />
        <BotonCalc texto="6" accion={armar} />
        <BotonCalc texto="-" color="#ff9427" accion={botonRestar} />
      </View>
      <View style={styles.fila}>
        <BotonCalc texto="1" accion={armar} />
        <BotonCalc texto="2" accion={armar} />
        <BotonCalc texto="3" accion={armar} />
        <BotonCalc texto="+" color="#ff9427" accion={botonSumar} />
      </View>
      <View style={styles.fila}>
        <BotonCalc texto="0" ancho accion={armar} />
        <BotonCalc texto="." accion={armar} />
        <BotonCalc texto="=" color="#ff9427" accion={calcular} />
      </View>
    </View>
  );
};
