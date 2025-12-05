import { useState, useCallback } from "react";
import { View, FlatList, Button, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import api from "../services/api";
import FerramentaItem from "../components/FerramentaItem";

export default function ListarFerramentasScreen({ navigation }) {
  const [ferramentas, setFerramentas] = useState([]);

  async function carregar() {
    try {
      const resposta = await api.get(""); 
      console.log("Resposta da API:", resposta.data);

      setFerramentas(resposta.data);
    } catch (error) {
      console.log("Erro ao carregar:", error.message);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  console.log("Estado ferramentas:", ferramentas);

  return (
    <View style={styles.container}>
      <Button
        title="Cadastrar Nova Ferramenta"
        onPress={() => navigation.navigate("CriarFerramenta")}
      />

      <FlatList
        data={ferramentas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FerramentaItem
            item={item}
            onPress={() =>
              navigation.navigate("DetalhesFerramenta", { id: item.id })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f3f3f3",
    flex: 1,
  },
});
