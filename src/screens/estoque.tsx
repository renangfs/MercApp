import React, { useState, useCallback } from 'react'; 
import { View, Text, FlatList, TouchableOpacity, Image, Alert, Modal } from 'react-native';
import styles from '../screens/stylesestoque';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import * as SQLite from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'Estoque'>;

interface Product {
  id: number;
  nome: string;
  quantidade: number;
  preco: number;
  imagem?: string;
}

const InventoryScreen: React.FC<Props> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const loadProducts = async () => {
    const db = await SQLite.openDatabaseAsync('produtos.db');
    const result = await db.getAllAsync<Product>('SELECT * FROM produtos');
    setProducts(result);
  };

  const getSelectedProduct = () => products.find(p => p.id === selectedProductId);

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  const handleSelect = (id: number) => {
    setSelectedProductId(id === selectedProductId ? null : id);
  };

  const handleDelete = () => {
    if (!selectedProductId) {
      Alert.alert('Atenção', 'Selecione um produto primeiro');
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    const db = await SQLite.openDatabaseAsync('produtos.db');
    await db.runAsync('DELETE FROM produtos WHERE id = ?', [selectedProductId]);
    setShowConfirmModal(false);
    setSelectedProductId(null);
    loadProducts();
  };

  const handleEdit = () => {
    if (!selectedProductId) {
      Alert.alert('Atenção', 'Selecione um produto primeiro');
      return;
    }
    navigation.navigate('Editar')
  };

  const renderItem = ({ item }: { item: Product }) => {
    const isSelected = item.id === selectedProductId;

    return (
      <TouchableOpacity
        style={[
          styles.rowData,
          {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 6,
            backgroundColor: isSelected ? '#104d2f' : '#d9d9d9',
          },
        ]}
        onPress={() => handleSelect(item.id)}
      >
        <View style={{ width: 40, marginRight: 8 }}>
          {item.imagem ? (
            <Image
              source={{ uri: item.imagem }}
              style={{ width: 40, height: 40, borderRadius: 4 }}
            />
          ) : (
            <View style={{ width: 40, height: 40, backgroundColor: '#eee', borderRadius: 4 }} />
          )}
        </View>
        <View style={{ flex: 2, justifyContent: 'center' }}>
          <Text style={[styles.rowText, { color: isSelected ? '#fff' : '#000' }]}>{item.nome}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={[styles.rowText, { color: isSelected ? '#fff' : '#000' }]}>{item.quantidade}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={[styles.rowText, { color: isSelected ? '#fff' : '#000' }]}>
            R$ {item.preco.toFixed(2).replace('.', ',')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const selectedProduct = getSelectedProduct();
  const isProductSelected = selectedProductId !== null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estoque</Text>

      <View style={styles.rowButtons}>
        <TouchableOpacity
          style={[
            styles.deleteButton,
            isProductSelected && { backgroundColor: '#e6e6e6' },
          ]}
          onPress={handleDelete}
        >
          <MaterialIcons
            name="close"
            size={18}
            color={isProductSelected ? 'red' : '#ccc'}
          />
          <Text
            style={[
              styles.deleteButtonText,
              isProductSelected && { color: 'black' },
            ]}
          >
            Excluir produto
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('Criar')}>
          <Feather name="plus" size={18} color="green" />
          <Text style={styles.createButtonText}>Criar produto</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.editButton,
          isProductSelected && { backgroundColor: '#e6e6e6' },
        ]}
        onPress={handleEdit}
      >
        <Feather
          name="edit-2"
          size={16}
          color={isProductSelected ? '#4c4c4c' : '#ccc'}
        />
        <Text
          style={[
            styles.editButtonText,
            isProductSelected && { color: 'black' },
          ]}
        >
          Editar produto
        </Text>
      </TouchableOpacity>

      <View
        style={[
          styles.tableHeader,
          {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 6,
            borderBottomWidth: 1,
            borderColor: '#ccc',
          },
        ]}
      >
        <View style={{ width: 40, marginRight: 8 }}>
          <Text style={styles.headerCell}>Img</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.headerCell}>Nome</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerCell}>Qtd</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerCell}>Valor</Text>
        </View>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      {/* Modal de confirmação */}
      <Modal transparent={true} visible={showConfirmModal} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.6)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 10,
              width: '80%',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
              Confirmar exclusão do produto:
            </Text>

            {selectedProduct?.nome && (
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'green', marginBottom: 12 }}>
                {selectedProduct.nome}
              </Text>
            )}

            {selectedProduct?.imagem && (
              <Image
                source={{ uri: selectedProduct.imagem }}
                style={{
                  width: 100,
                  height: 100,
                  marginBottom: 20,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#ccc',
                }}
              />
            )}

            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#B22222',
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  marginRight: 10,
                  borderRadius: 6,
                }}
                onPress={confirmDelete}
              >
                <Text style={{ color: '#fff' }}>Confirmar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: '#aaa',
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 6,
                }}
                onPress={() => setShowConfirmModal(false)}
              >
                <Text style={{ color: '#fff' }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InventoryScreen;