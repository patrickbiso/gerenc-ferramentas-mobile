import { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";
import colors from "../theme/colors";

export default function DetalhesFerramentaScreen({ route, navigation }) {
  const { id } = route.params;
  const [ferramenta, setFerramenta] = useState(null);

  const fade = useRef(new Animated.Value(0)).current;

  async function carregar() {
    try {
      const resposta = await api.get(`/${id}`);
      setFerramenta(resposta.data);

      Animated.timing(fade, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start();
    } catch {
      Alert.alert("Erro", "Não foi possível carregar os dados.");
    }
  }

  async function excluir() {
    Alert.alert(
      "Excluir",
      "Deseja realmente excluir esta ferramenta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/${id}`);
              Alert.alert("Sucesso", "Ferramenta excluída.");
              navigation.goBack();
            } catch {
              Alert.alert("Erro", "Falha ao excluir.");
            }
          }
        }
      ]
    );
  }

  useFocusEffect(
    useCallback(() => {
      fade.setValue(0);
      carregar();
    }, [id])
  );

  if (!ferramenta) {
    return (
      <View style={styles.loading}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>

        <Animated.View style={[styles.card, { opacity: fade }]}>
          <Text style={styles.titulo}>{ferramenta.nome}</Text>

          {/* CAMPO */}
          <View style={styles.row}>
            <Ionicons name="barcode-outline" size={22} color="#6b7280" />
            <Text style={styles.label}>Código:</Text>
            <Text style={styles.value}>{ferramenta.codigo}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="albums-outline" size={22} color="#8b5cf6" />
            <Text style={styles.label}>Categoria:</Text>
            <Text style={styles.value}>{ferramenta.categoria}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="document-text-outline" size={22} color="#3b82f6" />
            <Text style={styles.label}>Descrição:</Text>
            <Text style={styles.value}>{ferramenta.descricao}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="cube-outline" size={22} color="#f59e0b" />
            <Text style={styles.label}>Quantidade:</Text>
            <Text style={styles.value}>{ferramenta.quantidade}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="pricetag-outline" size={22} color="#22c55e" />
            <Text style={styles.label}>Preço:</Text>
            <Text style={styles.value}>R$ {ferramenta.preco}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="business-outline" size={22} color="#1d4ed8" />
            <Text style={styles.label}>Fornecedor:</Text>
            <Text style={styles.value}>{ferramenta.fornecedor}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="shield-checkmark-outline" size={22} color="#10b981" />
            <Text style={styles.label}>Garantia:</Text>
            <Text style={styles.value}>{ferramenta.garantiaMeses} meses</Text>
          </View>

          <View style={styles.row}>
            <Ionicons
              name={ferramenta.ativo ? "checkmark-circle-outline" : "close-circle-outline"}
              size={22}
              color={ferramenta.ativo ? "#10b981" : "#ef4444"}
            />
            <Text style={styles.label}>Ativo:</Text>
            <Text style={styles.value}>{ferramenta.ativo ? "Sim" : "Não"}</Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* BOTÕES FIXOS NO FINAL */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate("EditarFerramenta", { id })}
        >
          <Ionicons name="pencil" size={20} color="#fff" />
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.danger }]}
          onPress={excluir}
        >
          <Ionicons name="trash" size={20} color="#fff" />
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.secondary }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#fff" />
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 14,
    elevation: 4,
  },
  titulo: {
    fontSize: 26,
    fontFamily: "Nunito_700Bold",
    marginBottom: 20,
    color: colors.text,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontFamily: "Nunito_700Bold",
    marginLeft: 8,
    color: colors.textMedium,
  },
  value: {
    fontFamily: "Nunito_400Regular",
    marginLeft: 4,
    color: colors.text,
    flexShrink: 1,
  },
  footer: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Nunito_700Bold",
    fontSize: 15,
    marginLeft: 6,
  },
});
