import { useState, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Animated,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";
import FerramentaItem from "../components/FerramentaItem";
import colors from "../theme/colors";

function AnimatedItem({ item, index, onPress }) {
  const anim = new Animated.Value(0);

  Animated.timing(anim, {
    toValue: 1,
    duration: 350,
    delay: index * 60,
    useNativeDriver: true,
  }).start();

  return (
    <Animated.View
      style={{
        opacity: anim,
        transform: [
          {
            translateY: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [10, 0],
            }),
          },
          {
            scale: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.97, 1],
            }),
          },
        ],
        marginBottom: 12,
      }}
    >
      <FerramentaItem item={item} onPress={onPress} />
    </Animated.View>
  );
}

export default function ListarFerramentasScreen({ navigation }) {
  const [ferramentas, setFerramentas] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtradas, setFiltradas] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function carregar() {
    try {
      const resposta = await api.get("");

      const ordenadas = resposta.data.sort(
        (a, b) => Number(a.codigo.substring(1)) - Number(b.codigo.substring(1))
      );

      setFerramentas(ordenadas);
      setFiltradas(ordenadas);
    } catch (error) {}
  }

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  function filtrarLista(texto) {
    setBusca(texto);
    const termo = texto.toLowerCase();

    setFiltradas(
      ferramentas.filter(
        (f) =>
          f.nome.toLowerCase().includes(termo) ||
          f.codigo.toLowerCase().includes(termo) ||
          (f.categoria && f.categoria.toLowerCase().includes(termo))
      )
    );
  }

  function limparBusca() {
    setBusca("");
    setFiltradas(ferramentas);
  }

  async function onRefresh() {
    setRefreshing(true);
    await carregar();
    setRefreshing(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color={colors.textLight} />

        <TextInput
          style={styles.input}
          placeholder="Pesquisar..."
          placeholderTextColor={colors.textLight}
          value={busca}
          onChangeText={filtrarLista}
        />

        {busca.length > 0 && (
          <TouchableOpacity onPress={limparBusca}>
            <Ionicons name="close-circle" size={20} color={colors.textLight} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.fabContainer} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("CriarFerramenta")}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtradas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <AnimatedItem
            item={item}
            index={index}
            onPress={() =>
              navigation.navigate("DetalhesFerramenta", { id: item.id })
            }
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: colors.background,
    flex: 1,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 15,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: colors.text,
  },

  fabContainer: {
    position: "absolute",
    right: 20,
    bottom: 20,
    zIndex: 10,
    pointerEvents: "box-none",
  },

  fab: {
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
