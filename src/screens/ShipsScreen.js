// src/screens/ShipsScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ShipsScreen = ({ route }) => {
  const { personagem } = route.params;
  const [ships, setShips] = useState(null);

  useEffect(() => {
    // Função para buscar naves
    
    fetchShips();
  }, []);

  const fetchShips = async () => {
    try {
      console.log(personagem.starships)
      const responses = await Promise.all(personagem.starships.map(url => axios.get(url)));
      setShips(responses.map(response => response.data));
    } catch (error) {
      console.error(error);
    }
  };


  if(!ships) {
    return <ActivityIndicator size={"large"} />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Naves</Text>
      {ships.length > 0 ? (
        <FlatList
          data={ships}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>{item.name}</Text>
              <Text style={styles.cardDetail}>Model: {item.model}</Text>
              <Text style={styles.cardDetail}>Passengers: {item.passengers}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noData}>Nenhuma nave disponível.</Text>
      )}
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
  card: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'star-jedi', // Fonte personalizada
  },
  cardDetail: {
    color: '#EEE',
    fontSize: 14,
    fontFamily: 'star-jedi', // Fonte personalizada
  },
  noData: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'star-jedi', // Fonte personalizada
  },
});

export default ShipsScreen;
