import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function FerramentaItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.codigo}>{item.codigo}</Text>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.categoria}>{item.categoria}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  codigo: {
    fontSize: 14,
    color: "#555",
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categoria: {
    fontSize: 14,
    color: "#888",
  },
});
