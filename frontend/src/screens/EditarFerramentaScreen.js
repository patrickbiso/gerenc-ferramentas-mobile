import { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, ScrollView, Alert } from "react-native";
import api from "../services/api";

export default function EditarFerramentaScreen({ route, navigation }) {
  const { id } = route.params;
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

  async function carregar() {
    try {
      const resposta = await api.get(`/${id}`);
      const f = resposta.data;

      setForm({
        codigo: f.codigo,
        nome: f.nome,
        categoria: f.categoria,
        descricao: f.descricao,
        quantidade: String(f.quantidade),
        preco: String(f.preco),
        fornecedor: f.fornecedor,
        garantiaMeses: String(f.garantiaMeses),
        ativo: f.ativo,
      });

    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados.");
    }
  }

  async function salvar() {
    try {
      await api.put(`/${id}`, {
        ...form,
        quantidade: Number(form.quantidade),
        preco: Number(form.preco),
        garantiaMeses: Number(form.garantiaMeses),
      });

      Alert.alert("Sucesso", "Ferramenta atualizada com sucesso.");
      navigation.goBack();

    } catch (error) {
      Alert.alert("Erro", "Falha ao atualizar a ferramenta.");
      console.log(error);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Código"
        style={styles.input}
        value={form.codigo}
        onChangeText={(v) => atualizarCampo("codigo", v)}
      />

      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={form.nome}
        onChangeText={(v) => atualizarCampo("nome", v)}
      />

      <TextInput
        placeholder="Categoria"
        style={styles.input}
        value={form.categoria}
        onChangeText={(v) => atualizarCampo("categoria", v)}
      />

      <TextInput
        placeholder="Descrição"
        style={styles.input}
        value={form.descricao}
        onChangeText={(v) => atualizarCampo("descricao", v)}
      />

      <TextInput
        placeholder="Quantidade"
        keyboardType="numeric"
        style={styles.input}
        value={form.quantidade}
        onChangeText={(v) => atualizarCampo("quantidade", v)}
      />

      <TextInput
        placeholder="Preço"
        keyboardType="numeric"
        style={styles.input}
        value={form.preco}
        onChangeText={(v) => atualizarCampo("preco", v)}
      />

      <TextInput
        placeholder="Fornecedor"
        style={styles.input}
        value={form.fornecedor}
        onChangeText={(v) => atualizarCampo("fornecedor", v)}
      />

      <TextInput
        placeholder="Garantia Meses"
        keyboardType="numeric"
        style={styles.input}
        value={form.garantiaMeses}
        onChangeText={(v) => atualizarCampo("garantiaMeses", v)}
      />

      <Button title="Salvar Alterações" onPress={salvar} />
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
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
});
