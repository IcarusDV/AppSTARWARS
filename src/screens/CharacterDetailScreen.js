import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';

const CharacterDetailScreen = ({ route, navigation }) => {
  const { character } = route.params;
  const [naves, setNaves] = useState([]);
  const [filmes, setFilmes] = useState([]);
  const [sobre, setSobre] = useState('');
  const [personagem, setPersonagem] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    

    // fetchNaves();
    // fetchFilmes();
    fetchSobre();
  }, []);

  const fetchNaves = async () => {
    try {
      const responses = await Promise.all(character.starships.map(url => axios.get(url)));
      setNaves(responses.map(response => response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFilmes = async () => {
    try {
      const responses = await Promise.all(character.films.map(url => axios.get(url)));
      setFilmes(responses.map(response => response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSobre = async () => {
    const response = await axios.get(`https://swapi.dev/api/people?search=${character}`);
    console.log("====================")
    console.log(response.data.results[0])
    setPersonagem(response.data.results[0])
    const infoSobre = `Aqui estão algumas informações sobre ${character}. Este personagem é um dos mais icônicos da saga Star Wars.`;
    setSobre(infoSobre);
  };

  const characterImages = {
    'Luke Skywalker': require('../../assets/images/LukeSkywalker.gif'),
    'Darth Vader': require('../../assets/images/DarthVader.gif'),
    'Han Solo': require('../../assets/images/HanSolo.gif'),
    'Yoda': require('../../assets/images/Yoda.gif'),
    'Chewbacca': require('../../assets/images/Chewbacca.gif'),
    'Anakin Skywalker': require('../../assets/images/AnakinSkywalker.gif'),
    'Kylo Ren': require('../../assets/images/KyloRen.gif'),
    'Rey': require('../../assets/images/ReySkywalker.gif'),
  };

  if (!personagem) {
    return <ActivityIndicator  size={"large"}/>
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{personagem.name}</Text>
        <Image
          source={characterImages[personagem.name]}
          style={styles.characterImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>Altura: {personagem.height} cm</Text>
        <Text style={styles.detail}>Peso: {personagem.mass} kg</Text>
        <Text style={styles.detail}>Cor do Cabelo: {personagem.hair_color}</Text>
        <Text style={styles.detail}>Cor da Pele: {personagem.skin_color}</Text>
        <Text style={styles.detail}>Cor dos Olhos: {personagem.eye_color}</Text>
        <Text style={styles.detail}>Gênero: {personagem.gender}</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Sobre</Text>
        <Text style={styles.sectionText}>{sobre}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Ships', { personagem: personagem })}
        >
          <Text style={styles.buttonText}>Naves</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Movies', { personagem: personagem })}
        >
          <Text style={styles.buttonText}>Filmes</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}></Text>
        {naves.length > 0 ? (
          <FlatList
            data={naves}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardDetail}>Modelo: {item.model}</Text>
                <Text style={styles.cardDetail}>Número de Passageiros: {item.passengers}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noData}></Text>
        )}
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}></Text>
        {filmes.length > 0 ? (
          <FlatList
            data={filmes}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDetail}>Diretor: {item.director}</Text>
                <Text style={styles.cardDetail}>Data de Lançamento: {item.release_date}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noData}></Text>
        )}
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFE81F',
    fontSize: 18,
    fontFamily: 'star-jedi',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#FFE81F',
    fontFamily: 'star-jedi',
    marginBottom: 10,
  },
  sectionText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'star-jedi',
    marginBottom: 20,
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
    fontFamily: 'star-jedi',
  },
  cardDetail: {
    color: '#EEE',
    fontSize: 14,
    fontFamily: 'star-jedi',
  },
  noData: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'star-jedi',
  },
});

export default CharacterDetailScreen;
