import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import styles from '../screens/styleslogin';
import { useFocusEffect } from '@react-navigation/native'; // IMPORTANTE


type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {

  // Variáveis para armazenar login e senha
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  // Limpa campos ao voltar para a tela
  useFocusEffect(
    useCallback(() => {
      setLogin('');
      setSenha('');
    }, [])
  );

  const verificarSenha = () => {
  
  // Função para mostrar os dados no console
  console.log('Login:', login);
  console.log('Senha:', senha);

  // Trim tira espaços extras, por segurança
  const loginTrim = login.trim();
  const senhaTrim = senha.trim();

  // Verifica se os dois estão corretos
  if (loginTrim === 'a' && senhaTrim === '1') {
    //ir para outra pagina
    navigation.navigate('Estoque')
    return;
  }
  // Verifica se o login está errado
  if (loginTrim !== 'adm') {
    Alert.alert('Erro no login', 'Login incorreto.');
    return;
  }
  // Se login tá certo mas senha errada
  Alert.alert('Erro na senha', 'Senha incorreta.');
  
};
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
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
