import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

// Atualize este objeto com os caminhos corretos para os GIFs
const characterImages = {
  'Luke Skywalker': require('../../assets/images/LukeSkywalker.gif'),
  'Anakin Skywalker': require('../../assets/images/AnakinSkywalker.gif'),
  'Rey': require('../../assets/images/ReySkywalker.gif'),
  'Kylo Ren': require('../../assets/images/KyloRen.gif'),
  'Yoda': require('../../assets/images/Yoda.gif'),
  'Chewbacca': require('../../assets/images/Chewbacca.gif'),
  'Darth Vader': require('../../assets/images/DarthVader.gif'),
  'Han Solo': require('../../assets/images/HanSolo.gif'),
};

const CharacterDetailContainer = ({ character }) => {
  // Garante que a imagem e as informações estejam disponíveis
  if (!character || !characterImages[character.name]) {
    return <Text>Carregando...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{character.name}</Text>
        <Image
          source={characterImages[character.name]}
          style={styles.characterImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>Altura: {character.height} cm</Text>
        <Text style={styles.detail}>Peso: {character.mass} kg</Text>
        <Text style={styles.detail}>Cor do Cabelo: {character.hair_color}</Text>
        <Text style={styles.detail}>Cor da Pele: {character.skin_color}</Text>
        <Text style={styles.detail}>Cor dos Olhos: {character.eye_color}</Text>
        <Text style={styles.detail}>Gênero: {character.gender}</Text>
      </View>
      {/* Adicione se houver informações adicionais, como naves e filmes */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFE81F',
    fontFamily: 'star-jedi',
    marginBottom: 10,
  },
  characterImage: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detail: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'star-jedi',
  },
});

export default CharacterDetailContainer;
