import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const Calculator = () => {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [operator, setOperator] = useState('add');
  const [result, setResult] = useState('');

  const calculateResult = () => {
  const data = {
    firstNumber,
    secondNumber,
    operator
  };


  axios
    .post('http://your-api-endpoint.com/calculate', data)
    .then(response => {
      setResult(response.data);
    })
    .catch(error => {
      console.error(error);
    });
};

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={firstNumber}
        onChangeText={text => setFirstNumber(text)}
        keyboardType="numeric"
        placeholder="Enter first number"
      />
      <TextInput
        style={styles.input}
        value={secondNumber}
        onChangeText={text => setSecondNumber(text)}
        keyboardType="numeric"
        placeholder="Enter second number"
      />
      <Picker
        style={styles.picker}
        selectedValue={operator}
        onValueChange={(itemValue, itemIndex) => setOperator(itemValue)}
      >
        <Picker.Item label="Add" value="add" />
        <Picker.Item label="Subtract" value="subtract" />
        <Picker.Item label="Multiply" value="multiply" />
      </Picker>
      <Button
        style={styles.button}
        onPress={calculateResult}
        title="Calculate"
      />
      <Text style={styles.result}>Result: {result}</Text>
    </View>
  );
};

export default Calculator;

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10
  },
  picker: {
    width: '100%',
    height: 40,
    marginBottom: 10
  },
  button: {
    width: '100%'
  },
  result: {
    marginTop: 20,
  }
}
