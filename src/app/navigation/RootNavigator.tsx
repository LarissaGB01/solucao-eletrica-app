import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { titulosTelas } from '../../content/navegacao';
import { FormCabeamentoScreen } from '../../presentation/features/cabeamento/FormCabeamentoScreen';
import { ResultadoCabeamentoScreen } from '../../presentation/features/cabeamento/ResultadoCabeamentoScreen';
import { FormDisjuntorScreen } from '../../presentation/features/disjuntor/FormDisjuntorScreen';
import { ResultadoDisjuntorScreen } from '../../presentation/features/disjuntor/ResultadoDisjuntorScreen';
import { FormEletrodutoScreen } from '../../presentation/features/eletroduto/FormEletrodutoScreen';
import { ResultadoEletrodutoScreen } from '../../presentation/features/eletroduto/ResultadoEletrodutoScreen';
import { PassoAPassoCondutorScreen } from '../../presentation/features/passoAPasso/PassoAPassoCondutorScreen';
import { PassoAPassoDisjuntorScreen } from '../../presentation/features/passoAPasso/PassoAPassoDisjuntorScreen';
import { PassoAPassoEletrodutoScreen } from '../../presentation/features/passoAPasso/PassoAPassoEletrodutoScreen';
import { TeoriaScreen } from '../../presentation/features/teoria/TeoriaScreen';
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
          component={TeoriaScreen}
          options={{ title: titulosTelas.teoria }}
        />
        <Stack.Screen
          name="FormCabeamento"
          component={FormCabeamentoScreen}
          options={{ title: titulosTelas.formulario }}
        />
        <Stack.Screen
          name="ResultadoCabeamento"
          component={ResultadoCabeamentoScreen}
          options={{ title: titulosTelas.resultado }}
        />
        <Stack.Screen
          name="FormDisjuntor"
          component={FormDisjuntorScreen}
          options={{ title: titulosTelas.formulario }}
        />
        <Stack.Screen
          name="ResultadoDisjuntor"
          component={ResultadoDisjuntorScreen}
          options={{ title: titulosTelas.resultado }}
        />
        <Stack.Screen
          name="FormEletroduto"
          component={FormEletrodutoScreen}
          options={{ title: titulosTelas.formulario }}
        />
        <Stack.Screen
          name="ResultadoEletroduto"
          component={ResultadoEletrodutoScreen}
          options={{ title: titulosTelas.resultado }}
        />
        <Stack.Screen
          name="PassoAPassoCondutor"
          component={PassoAPassoCondutorScreen}
          options={{ title: titulosTelas.passoAPasso }}
        />
        <Stack.Screen
          name="PassoAPassoDisjuntor"
          component={PassoAPassoDisjuntorScreen}
          options={{ title: titulosTelas.passoAPasso }}
        />
        <Stack.Screen
          name="PassoAPassoEletroduto"
          component={PassoAPassoEletrodutoScreen}
          options={{ title: titulosTelas.passoAPasso }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
