import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, ScrollView } from "react-native";
import api from "../services/api";

export default function CriarFerramentaScreen({ navigation }) {
  const [form, setForm] = useState({
    codigo: "",
    nome: "",
    categoria: "",
    descricao: "",
    quantidade: "",
    preco: "",
    fornecedor: "",
    garantiaMeses: "",
    ativo: true,
  });

  function atualizarCampo(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  async function salvar() {
    try {
      await api.post("", {
        ...form,
        quantidade: Number(form.quantidade),
        preco: Number(form.preco),
        garantiaMeses: Number(form.garantiaMeses),
      });

      Alert.alert("Sucesso", "Ferramenta cadastrada!");
      navigation.goBack();

    } catch (error) {
      let mensagem = "Falha ao cadastrar.";

      if (error.response?.data?.message) {
        mensagem = error.response.data.message;
      }
      else if (error.response?.data?.errors) {
        const erros = error.response.data.errors;
        mensagem = Object.values(erros).join("\n");
      }

      Alert.alert("Erro", mensagem);
      console.log("Erro detalhado:", error.response?.data || error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput placeholder="Código (F001)" style={styles.input} onChangeText={(v) => atualizarCampo("codigo", v)} />
      <TextInput placeholder="Nome" style={styles.input} onChangeText={(v) => atualizarCampo("nome", v)} />
      <TextInput placeholder="Categoria" style={styles.input} onChangeText={(v) => atualizarCampo("categoria", v)} />
      <TextInput placeholder="Descrição" style={styles.input} onChangeText={(v) => atualizarCampo("descricao", v)} />
      <TextInput placeholder="Quantidade" style={styles.input} keyboardType="numeric" onChangeText={(v) => atualizarCampo("quantidade", v)} />
      <TextInput placeholder="Preço" style={styles.input} keyboardType="numeric" onChangeText={(v) => atualizarCampo("preco", v)} />
      <TextInput placeholder="Fornecedor" style={styles.input} onChangeText={(v) => atualizarCampo("fornecedor", v)} />
      <TextInput placeholder="Garantia (meses)" style={styles.input} keyboardType="numeric" onChangeText={(v) => atualizarCampo("garantiaMeses", v)} />

      <Button title="Salvar" onPress={salvar} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    fontSize: 16,
  },
});
