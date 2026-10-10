import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { titulosTelas } from '../../content/navegacao';
import { EmConstrucaoScreen } from '../../presentation/features/emConstrucao/EmConstrucaoScreen';
import { HomeScreen } from '../../presentation/features/home/HomeScreen';
import type { RootStackParamList } from '../../presentation/navigation/routes';
import { colors } from '../../presentation/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTintColor: colors.primary }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Teoria"
          component={EmConstrucaoScreen}
          options={{ title: titulosTelas.teoria }}
        />
        <Stack.Screen
          name="FormCabeamento"
          component={EmConstrucaoScreen}
          options={{ title: titulosTelas.formulario }}
        />
        <Stack.Screen
          name="FormDisjuntor"
          component={EmConstrucaoScreen}
          options={{ title: titulosTelas.formulario }}
        />
        <Stack.Screen
          name="FormEletroduto"
          component={EmConstrucaoScreen}
          options={{ title: titulosTelas.formulario }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
