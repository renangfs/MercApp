import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity, BackHandler } from 'react-native';
import styles from '../screens/stylesvisualizar';
import * as SQLite from 'expo-sqlite';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


interface Product {
  id: number;
  nome: string;
  preco: number;
  imagem?: string;
  quantidade: number;
}

const ProductListScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const navigation = useNavigation();
  const dbRef = useRef<SQLite.SQLiteDatabase | null>(null); // Ref para a conexão persistente

  // Função para obter (ou abrir) a conexão ao banco de forma persistente
  const getDatabase = async () => {
    if (!dbRef.current) {
      dbRef.current = await SQLite.openDatabaseAsync('produtos.db');
    }
    return dbRef.current;
  };

  const loadProducts = async () => {
    const db = await getDatabase();
    const result = await db.getAllAsync<Product>('SELECT * FROM produtos');
    setProducts(result);
  };

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Index' as never);
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigation]);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    setSearchText('');
  };

  const filteredProducts = products.filter(product =>
    product.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.itemContainer}>
      <View style={styles.imageBox}>
        {item.imagem ? (
          <Image source={{ uri: item.imagem }} style={styles.image} resizeMode="contain" />
        ) : (
          <View style={[styles.image, { backgroundColor: '#ccc' }]} />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.nome}</Text>
        <Text style={styles.price}>R$ {item.preco.toFixed(2).replace('.', ',')}</Text>
        <Text style={[styles.stock, { color: item.quantidade > 0 ? '#93bf83' : '#bf3f3f' }]}>
          {item.quantidade > 0 ? 'Estoque disponível' : 'Estoque indisponível'}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          {searchVisible ? (
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar produto..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
              autoFocus
            />
          ) : (
            <>
              <TouchableOpacity onPress={() => console.log('Conta pressionada')}>
                <Image source={require('../images/user.png')} style={styles.user} resizeMode="contain" />
              </TouchableOpacity>
              <View style={styles.centerArea}>
                <Image source={require('../images/carrolupa.png')} style={styles.carrolupa} resizeMode="contain" />
              </View>
            </>
          )}
          <TouchableOpacity onPress={toggleSearch}>
            <Image source={require('../images/search.png')} style={styles.lupa} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductListScreen;
