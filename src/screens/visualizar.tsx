import React, { useState } from "react";
import { View, Text, Image, FlatList, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import styles from "../screens/stylesvisualizar";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  available: boolean;
}

const products: Product[] = [
  { id: "1", name: "Água mineral", price: "R$ 00,00", image: "https://i.imgur.com/0rUp8q6.png", available: false },
  { id: "2", name: "Fanta Laranja", price: "R$ 00,00", image: "https://i.imgur.com/5t1skvG.png", available: true },
  { id: "3", name: "Arroz integral", price: "R$ 00,00", image: "https://i.imgur.com/q9xh4Y4.png", available: true },
  { id: "4", name: "Feijão carioca", price: "R$ 00,00", image: "https://i.imgur.com/HnlR6XX.png", available: true },
  { id: "5", name: "Maçã", price: "R$ 00,00", image: "https://i.imgur.com/6H2Kdx6.png", available: true },
  { id: "6", name: "Banana nanica", price: "R$ 00,00", image: "https://i.imgur.com/9Btbylw.png", available: true },
];

const ProductListScreen: React.FC = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    setSearchText("");
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.itemContainer}>
      <View style={styles.imageBox}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={[styles.stock, { color: item.available ? "#999" : "#e74c3c" }]}>
          {item.available ? "Estoque disponível" : "Estoque indisponível"}
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
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default ProductListScreen;
