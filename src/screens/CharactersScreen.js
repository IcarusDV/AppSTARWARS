import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const CharactersScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);  // Inicializa a opacidade com 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,  // Anima para opacidade 1
      duration: 1000,  // 1 segundo
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const characters = [
    'Luke Skywalker',
    'Darth Vader',
    'Han Solo',
    'Yoda',
    'Chewbacca',
    'Anakin Skywalker',
    'Kylo Ren',
    'Rey'
  ];

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.title}>Personagens</Text>
        {characters.map((character, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.card}
            onPress={() => navigation.navigate('CharacterDetail', { character })}
          >
            <Text style={styles.cardText}>{character}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
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
    fontWeight: 'bold',
    color: '#FFE81F',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'star-jedi',
  },
  card: {
    backgroundColor: '#333',
    padding: 25,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
  },
  cardText: {
    color: '#FFF',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'star-jedi',
  },
});

export default CharactersScreen