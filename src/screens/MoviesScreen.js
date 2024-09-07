// src/screens/MoviesScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const MoviesScreen = ({ route }) => {
  const { personagem } = route.params;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Função para buscar naves
    
    fetchMovies();
  }, []);

  const fetchMovies= async () => {
    try {
      const responses = await Promise.all(personagem.films.map(url => axios.get(url)));
      setMovies(responses.map(response => response.data));
    } catch (error) {
      console.error(error);
    }
  };


  if(!movies) {
    return <ActivityIndicator size={"large"} />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filmes</Text>
      {movies.length > 0 ? (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDetail}>Director: {item.director}</Text>
              <Text style={styles.cardDetail}>Release Date: {item.release_date}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noData}>Nenhum filme disponível.</Text>
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
  cardTitle: {
    color: '#FFE81F',
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

export default MoviesScreen;
