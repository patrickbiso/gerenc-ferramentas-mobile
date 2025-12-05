import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts, Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { View, ActivityIndicator } from "react-native";
import colors from "./src/theme/colors";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import ListarFerramentasScreen from "./src/screens/ListarFerramentasScreen";
import CriarFerramentaScreen from "./src/screens/CriarFerramentaScreen";
import EditarFerramentaScreen from "./src/screens/EditarFerramentaScreen";
import DetalhesFerramentaScreen from "./src/screens/DetalhesFerramentaScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={32} color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "Nunito_700Bold",
            fontSize: 20,
          },
          headerBackTitleVisible: false,
        }}
      >

        
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ListarFerramentas"
          component={ListarFerramentasScreen}
          options={{ title: "Ferramentas" }}
        />

        <Stack.Screen
          name="CriarFerramenta"
          component={CriarFerramentaScreen}
          options={{ title: "Adicionar Ferramenta" }}
        />

        <Stack.Screen
          name="EditarFerramenta"
          component={EditarFerramentaScreen}
          options={{ title: "Editar Ferramenta" }}
        />

        <Stack.Screen
          name="DetalhesFerramenta"
          component={DetalhesFerramentaScreen}
          options={{ title: "Detalhes" }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
