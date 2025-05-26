// src/navigation/StackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '../screens/index';
import Login from '../screens/login';
import Estoque from '../screens/estoque';
import Criar from '../screens/criar';
import JanelaStatus from '../screens/janelastatus';
import Editar from '../screens/editar';

export type RootStackParamList = {
  Index: undefined;
  Login: undefined;
  Estoque: undefined;
  Criar: undefined;
  JanelaStatus: undefined;
  Editar: {
    id: number;
    nome: string;
    quantidade: number;
    preco: number;
    imagem?: string;
  }; // ✅ Agora a tela Editar espera os dados do produto
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Index">
      <Stack.Screen name="Index" component={Index} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Estoque" component={Estoque} options={{ headerShown: false }} />
      <Stack.Screen name="Criar" component={Criar} options={{ headerShown: false }} />
      <Stack.Screen name="JanelaStatus" component={JanelaStatus} options={{ headerShown: false }} />
      <Stack.Screen name="Editar" component={Editar} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
