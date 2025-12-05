import { useState, useCallback } from "react";
import {
  View,
  FlatList,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";
import FerramentaItem from "../components/FerramentaItem";

export default function ListarFerramentasScreen({ navigation }) {
  const [ferramentas, setFerramentas] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtradas, setFiltradas] = useState([]);

  async function carregar() {
    try {
      const resposta = await api.get("");
      setFerramentas(resposta.data);
      setFiltradas(resposta.data);
    } catch (error) {
      console.log("Erro ao carregar:", error.message);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  function filtrarLista(texto) {
    setBusca(texto);
    const termo = texto.toLowerCase();
    const novaLista = ferramentas.filter(
      (f) =>
        f.nome.toLowerCase().includes(termo) ||
        f.codigo.toLowerCase().includes(termo) ||
        (f.categoria && f.categoria.toLowerCase().includes(termo))
    );
    setFiltradas(novaLista);
  }

  function limparBusca() {
    setBusca("");
    setFiltradas(ferramentas);
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={22} color="#666" style={styles.icon} />

        <TextInput
          style={styles.input}
          placeholder="Pesquisar..."
          value={busca}
          onChangeText={filtrarLista}
        />

        {busca.length > 0 && (
          <TouchableOpacity onPress={limparBusca}>
            <Ionicons name="close-circle" size={22} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title="Cadastrar Nova Ferramenta"
          onPress={() => navigation.navigate("CriarFerramenta")}
        />
      </View>

      <FlatList
        data={filtradas}
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
    padding: 15,
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
    elevation: 2,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  buttonWrapper: {
    marginBottom: 15,
  },
});
