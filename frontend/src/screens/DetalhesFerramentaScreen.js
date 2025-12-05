import { useState, useCallback } from "react";
import { View, Text, Button, StyleSheet, Alert, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import api from "../services/api";

export default function DetalhesFerramentaScreen({ route, navigation }) {
  const { id } = route.params;
  const [ferramenta, setFerramenta] = useState(null);

  async function carregar() {
    try {
      const resposta = await api.get(`/${id}`);
      setFerramenta(resposta.data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados.");
    }
  }

  async function excluir() {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir esta ferramenta?",
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
            } catch (e) {
              Alert.alert("Erro", "Não foi possível excluir.");
            }
          }
        }
      ]
    );
  }


  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [id])
  );

  if (!ferramenta) {
    return (
      <View style={styles.center}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>{ferramenta.nome}</Text>

        <Text style={styles.info}>
          <Text style={styles.label}>Código:</Text> {ferramenta.codigo}
        </Text>

        <Text style={styles.info}>
          <Text style={styles.label}>Categoria:</Text> {ferramenta.categoria}
        </Text>

        <Text style={styles.info}>
          <Text style={styles.label}>Descrição:</Text> {ferramenta.descricao}
        </Text>

        <Text style={styles.info}>
          <Text style={styles.label}>Quantidade:</Text> {ferramenta.quantidade}
        </Text>

        <Text style={styles.info}>
          <Text style={styles.label}>Preço:</Text> R$ {ferramenta.preco}
        </Text>

        <Text style={styles.info}>
          <Text style={styles.label}>Fornecedor:</Text> {ferramenta.fornecedor}
        </Text>

        <Text style={styles.info}>
          <Text style={styles.label}>Garantia:</Text> {ferramenta.garantiaMeses} meses
        </Text>

        <Text style={styles.info}>
          <Text style={styles.label}>Ativo:</Text> {ferramenta.ativo ? "Sim" : "Não"}
        </Text>
      </View>

      <View style={styles.buttons}>
        <Button
          title="Editar"
          onPress={() =>
            navigation.navigate("EditarFerramenta", { id: ferramenta.id })
          }
        />

        <Button title="Excluir" color="#d32f2f" onPress={excluir} />

        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
  },
  buttons: {
    gap: 10,
  },
});
