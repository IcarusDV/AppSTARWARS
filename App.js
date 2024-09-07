import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet } from 'react-native';

import CharactersScreen from './src/screens/CharactersScreen';
import CharacterDetailScreen from './src/screens/CharacterDetailScreen';
import ShipsScreen from './src/screens/ShipsScreen';
import MoviesScreen from './src/screens/MoviesScreen';
import AboutScreen from './src/screens/AboutScreen';

const Stack = createStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    'star-jedi': require('./assets/fonts/Starjedi.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await fetchFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!fontsLoaded) {
    return null; // Exibir uma tela de carregamento personalizada se necessário
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
      >
        <Stack.Screen name="Characters" component={CharactersScreen} />
        <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} />
        <Stack.Screen name="Ships" component={ShipsScreen} />
        <Stack.Screen name="Movies" component={MoviesScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000',  // Fundo preto
  },
  headerTitle: {
    color: '#FFE81F', // Amarelo fosco
    fontFamily: 'star-jedi', // Fonte personalizada
  },
});
