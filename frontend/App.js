import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListarFerramentasScreen from "./src/screens/ListarFerramentasScreen";
import CriarFerramentaScreen from "./src/screens/CriarFerramentaScreen";
import EditarFerramentaScreen from "./src/screens/EditarFerramentaScreen";
import DetalhesFerramentaScreen from "./src/screens/DetalhesFerramentaScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListarFerramentas">
        
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
