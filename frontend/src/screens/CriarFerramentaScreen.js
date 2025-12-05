import { useState } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import api from "../services/api";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import colors from "../theme/colors";

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
      let msg = "Falha ao cadastrar.";

      if (error.response?.data?.errors) {
        msg = Object.values(error.response.data.errors).join("\n");
      }

      Alert.alert("Erro", msg);
      console.log("Erro detalhado:", error.response?.data || error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <InputField icon="barcode" placeholder="Código (F001)" onChangeText={(v) => atualizarCampo("codigo", v)} />
      <InputField icon="hammer" placeholder="Nome" onChangeText={(v) => atualizarCampo("nome", v)} />
      <InputField icon="albums" placeholder="Categoria" onChangeText={(v) => atualizarCampo("categoria", v)} />
      <InputField icon="document-text" placeholder="Descrição" onChangeText={(v) => atualizarCampo("descricao", v)} />
      <InputField icon="cube" placeholder="Quantidade" keyboardType="numeric" onChangeText={(v) => atualizarCampo("quantidade", v)} />
      <InputField icon="cash" placeholder="Preço" keyboardType="numeric" onChangeText={(v) => atualizarCampo("preco", v)} />
      <InputField icon="business" placeholder="Fornecedor" onChangeText={(v) => atualizarCampo("fornecedor", v)} />
      <InputField icon="time" placeholder="Garantia (meses)" keyboardType="numeric" onChangeText={(v) => atualizarCampo("garantiaMeses", v)} />

      <PrimaryButton title="Salvar" onPress={salvar} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
  },
});
