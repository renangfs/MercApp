import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../screens/stylescriar';
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

const db = SQLite.openDatabaseSync('produtos.db');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Criar'>;

const CreateProductScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [imagem, setImagem] = useState<string | null>(null);
  const [nome, setnome] = useState('');
  const [qtd, setqtd] = useState('');
  const [preco, setPrice] = useState('');

  useEffect(() => {
    db.runSync(`
      CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        quantidade INTEGER,
        preco REAL,
        imagem TEXT
      )
    `);
  }, []);

  const escolherImagem = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const removerImagem = () => {
    setImagem(null);
  };

  const cadastrarProduto = () => {
    if (!nome || !qtd || !preco) {
      Alert.alert("Preencha todos os campos obrigatórios.");
      return;
    }

    db.runSync(
      "INSERT INTO produtos (nome, quantidade, preco, imagem) VALUES (?, ?, ?, ?)",
      nome,
      parseInt(qtd),
      parseFloat(preco),
      imagem || ""
    );

    console.log("Produto cadastrado com sucesso.");

    setnome('');
    setqtd('');
    setPrice('');
    setImagem(null);

    // Redirecionar para a tela de status
    navigation.navigate('JanelaStatus');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleEstoque}>Estoque</Text>
      <Text style={styles.title}>Criar novo produto</Text>

      <Text style={styles.label}>Nome do produto</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setnome} />

      <Text style={styles.label}>Quantidade</Text>
      <TextInput style={styles.input} value={qtd} onChangeText={setqtd} keyboardType="numeric" />

      <Text style={styles.label}>Valor</Text>
      <TextInput style={styles.input} value={preco} onChangeText={setPrice} keyboardType="decimal-pad" placeholder="R$" />

      <Text style={styles.label}>Adicionar imagem</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={escolherImagem}>
        <Text style={styles.uploadText}>Upload</Text>
        <FontAwesome name="arrow-up" size={16} color="#134E3A" />
      </TouchableOpacity>

      {imagem && (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
          <Image source={{ uri: imagem }} style={{ width: 70, height: 70, borderRadius: 10 }} />
          <TouchableOpacity onPress={removerImagem} style={{ marginLeft: 10 }}>
            <FontAwesome name="trash" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={cadastrarProduto}>
        <Text style={styles.submitText}>Cadastrar novo produto</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateProductScreen;
