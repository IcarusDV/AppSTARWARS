// src/screens/AboutScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre</Text>
      <Text style={styles.info}>Desenvolvedores:</Text>
      <Text style={styles.developer}>RA: 123456</Text>
      <Text style={styles.developer}>Nome Completo: Seu Nome</Text>
      <Text style={styles.developer}>Email: seuemail@example.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFE81F',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'star-jedi', // Fonte personalizada
  },
  info: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'star-jedi', // Fonte personalizada
  },
  developer: {
    color: '#EEE',
    fontSize: 16,
    marginVertical: 5,
    fontFamily: 'star-jedi', // Fonte personalizada
  },
});

export default AboutScreen;
