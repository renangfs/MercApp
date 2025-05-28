import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, BackHandler } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import styles from '../screens/styleslogin';
import { useFocusEffect } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  useFocusEffect(
    useCallback(() => {
      setLogin('');
      setSenha('');
    }, [])
  );

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Index');
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigation]);

  const verificarSenha = () => {
    const loginTrim = login.trim();
    const senhaTrim = senha.trim();

    if (loginTrim === 'a' && senhaTrim === '1') {
      navigation.navigate('Estoque');
      return;
    }
    if (loginTrim !== 'adm') {
      Alert.alert('Erro no login', 'Login incorreto.');
      return;
    }
    Alert.alert('Erro na senha', 'Senha incorreta.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../images/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>
      <Text style={styles.subtitle}>Acesse sua conta</Text>

      <Text style={styles.label}>Nome do administrador</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor="#999"
        value={login}
        onChangeText={setLogin}
      />

      <Text style={styles.label}>Senha do administrador</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        placeholderTextColor="#999"
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity>
        <Text style={styles.forgot}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={verificarSenha}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.register}>Cadastrar administrador</Text>
      </TouchableOpacity>
    </View>
  );
}
