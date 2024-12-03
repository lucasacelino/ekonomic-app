import Header from "@/components/Header";
import ModalDespesa from "@/components/ModalDespesa";
import { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TipoDespesa = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [valor, setValor] = useState("");
  const [tituloDespesa, setTitulo] = useState(""); 
  const [listaDespesas, setListaDespesas] = useState([]);
  const [indiceDespesa, setIndice] = useState(null);
  const [editarDespesa, setEdicao] = useState(false);

  const adicionarDespesa = () => {
    setListaDespesas([...listaDespesas, {titulo: tituloDespesa, valor: valor}]);
    resetModal();
  };

  const atualizarDespesa = () => {
    const novaLista = [...listaDespesas];
    novaLista[indiceDespesa] = { titulo: tituloDespesa, valor: valor };
    setListaDespesas(novaLista);
    resetModal();
  };

  const deletarDespesa = () => {
    const novaLista = listaDespesas.filter((_, index) => index !== indiceDespesa);
    setListaDespesas(novaLista);
    resetModal();
  };

  const abrirModalParaEditar = (item, index) => {
    setTitulo(item.titulo);
    setValor(item.valor);
    setIndice(index);
    setEdicao(true);
    setModalVisible(true);
  };

  const resetModal = () => {
    setTitulo("");
    setValor("");
    setIndice(null);
    setEdicao(false);
    setModalVisible(false);
  };


  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setEdicao(false);
          setModalVisible(true);
        }}
      >
        <Text style={styles.textButton}>Adicionar Despesa</Text>
      </TouchableOpacity>

      <ModalDespesa
        visible={modalVisible}
        onClose={resetModal}
        // onSave={adicionarDespesa}
        onSave={editarDespesa ? atualizarDespesa : adicionarDespesa}
        onDelete={deletarDespesa}
        editarDespesa={editarDespesa}
        tituloDespesa={tituloDespesa}
        setTitulo={setTitulo}
        valor={valor}
        setValor={setValor}
      />

      <FlatList
        data={listaDespesas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index}) => (
          <TouchableOpacity onPress={() => abrirModalParaEditar(item, index)}>
            <View style={styles.item}>
              <Text style={styles.itemTitulo}>{item.titulo}</Text>
              <Text style={styles.itemValor}>Valor: R$ {item.valor}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "#FFFFFF",
    fontFamily: "Montserrat_500Medium",
  },
  button: {
    backgroundColor: "#226F54",
    marginTop: 90,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 50,
    borderRadius: 4,
  },
  item: {
    padding: 15,
    marginTop: 5,
    backgroundColor: '#226F54',
    borderRadius: 4,
    borderColor: '#25A18E',
    marginBottom: 10,
    borderWidth: 3,
    elevation: 2, 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemTitulo: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: "bold"
  },
  itemValor: {
    fontSize: 16,
    color: '#FFFFFF'
  }
});

export default TipoDespesa;