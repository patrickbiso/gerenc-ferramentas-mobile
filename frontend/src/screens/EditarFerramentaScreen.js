import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import api from "../services/api";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import colors from "../theme/colors";

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
      const f = (await api.get(`/${id}`)).data;

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
      Alert.alert("Erro", "Não foi possível carregar.");
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

      Alert.alert("Sucesso", "Alterações salvas.");
      navigation.goBack();

    } catch (error) {
      let msg = "Falha ao atualizar.";

      if (error.response?.data?.errors) {
        msg = Object.values(error.response.data.errors).join("\n");
      }

      Alert.alert("Erro", msg);
      console.log("Erro:", error.response?.data || error);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <InputField icon="barcode" placeholder="Código" value={form.codigo} onChangeText={(v) => atualizarCampo("codigo", v)} />
      <InputField icon="hammer" placeholder="Nome" value={form.nome} onChangeText={(v) => atualizarCampo("nome", v)} />
      <InputField icon="albums" placeholder="Categoria" value={form.categoria} onChangeText={(v) => atualizarCampo("categoria", v)} />
      <InputField icon="document-text" placeholder="Descrição" value={form.descricao} onChangeText={(v) => atualizarCampo("descricao", v)} />
      <InputField icon="cube" placeholder="Quantidade" keyboardType="numeric" value={form.quantidade} onChangeText={(v) => atualizarCampo("quantidade", v)} />
      <InputField icon="cash" placeholder="Preço" keyboardType="numeric" value={form.preco} onChangeText={(v) => atualizarCampo("preco", v)} />
      <InputField icon="business" placeholder="Fornecedor" value={form.fornecedor} onChangeText={(v) => atualizarCampo("fornecedor", v)} />
      <InputField icon="time" placeholder="Garantia (meses)" keyboardType="numeric" value={form.garantiaMeses} onChangeText={(v) => atualizarCampo("garantiaMeses", v)} />

      <PrimaryButton title="Salvar Alterações" onPress={salvar} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
  },
});
