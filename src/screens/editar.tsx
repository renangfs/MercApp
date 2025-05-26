// src/screens/editar.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../screens/styleseditar';
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Editar'>;

const EditProductScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id, nome: initialNome, quantidade: initialQtd, preco: initialPreco, imagem: initialImagem } = route.params;

  const [imagem, setImagem] = useState<string | undefined>(initialImagem);
  const [nome, setnome] = useState(initialNome);
  const [qtd, setqtd] = useState(initialQtd.toString());
  const [preco, setPrice] = useState(initialPreco.toString());

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
    setImagem(undefined);
  };

  const atualizarProduto = async () => {
    if (!nome || !qtd || !preco) {
      Alert.alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const db = await SQLite.openDatabaseAsync('produtos.db');
    await db.runAsync(
      "UPDATE produtos SET nome = ?, quantidade = ?, preco = ?, imagem = ? WHERE id = ?",
      [nome, parseInt(qtd), parseFloat(preco), imagem || '', id]
    );

    Alert.alert("Produto atualizado com sucesso!");
    navigation.navigate('Estoque');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleEstoque}>Estoque</Text>
      <Text style={styles.title}>Editar produto</Text>

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

      <TouchableOpacity style={styles.submitButton} onPress={atualizarProduto}>
        <Text style={styles.submitText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProductScreen;
