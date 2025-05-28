import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import styles from "../screens/stylesvisualizar";
import * as SQLite from 'expo-sqlite';

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
  const [searchText, setSearchText] = useState("");

  const loadProducts = async () => {
    const db = await SQLite.openDatabaseAsync('produtos.db');
    const result = await db.getAllAsync<Product>('SELECT * FROM produtos');
    setProducts(result);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    setSearchText("");
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
          <View style={[styles.image, { backgroundColor: "#ccc" }]} />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.nome}</Text>
        <Text style={styles.price}>R$ {item.preco.toFixed(2).replace('.', ',')}</Text>
        <Text style={[styles.stock, { color: item.quantidade > 0 ? "#93bf83" : "#bf3f3f" }]}>
          {item.quantidade > 0 ? "Estoque disponível" : "Estoque indisponível"}
        </Text>
      </View>
    </View>
  );

return (
  <SafeAreaView style={styles.container}>
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
          <TouchableOpacity onPress={() => console.log("Conta pressionada")}>
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
  </SafeAreaView>
);

};

export default ProductListScreen;
