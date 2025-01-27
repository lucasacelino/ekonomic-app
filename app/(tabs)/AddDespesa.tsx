import Header from "@/components/Header";
import ModalDespesa from "@/components/ModalDespesa";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Link as ExpoLink } from 'expo-router'; // Importe corretamente o Link do Expo Router

const AddDespesa = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [valor, setValor] = useState("");
  const [tituloDespesa, setTitulo] = useState("");
  const [listaDespesas, setListaDespesas] = useState([]);
  const [indiceDespesa, setIndice] = useState(null);
  const [editarDespesa, setEdicao] = useState(false);
  const [localizacao, setLocalizacao] = useState(null);

  useEffect(() => {
    carregarDespesas();
    obterLocalizacao();
  }, []);

  const carregarDespesas = async () => {
    try {
      const despesasSalvas = await AsyncStorage.getItem("despesas");
      if (despesasSalvas) {
        setListaDespesas(JSON.parse(despesasSalvas));
      }
    } catch (error) {
      console.error("Erro ao carregar despesas:", error);
    }
  };

  const salvarDespesas = async (despesas) => {
    try {
      await AsyncStorage.setItem("despesas", JSON.stringify(despesas));
    } catch (error) {
      console.error("Erro ao salvar despesas:", error);
    }
  };

  const obterLocalizacao = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Não foi possível obter a localização.");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLocalizacao(location.coords);
    } catch (error) {
      console.error("Erro ao obter localização:", error);
    }
  };

  const adicionarDespesa = () => {
    const novaDespesa = { titulo: tituloDespesa, valor: valor };
    const novaLista = [...listaDespesas, novaDespesa];
    setListaDespesas(novaLista);
    salvarDespesas(novaLista);
    resetModal();
  };

  const atualizarDespesa = () => {
    const novaLista = [...listaDespesas];
    novaLista[indiceDespesa] = { titulo: tituloDespesa, valor: valor };
    setListaDespesas(novaLista);
    salvarDespesas(novaLista);
    resetModal();
  };

  const deletarDespesa = () => {
    const novaLista = listaDespesas.filter((item, index) => index !== indiceDespesa);
    setListaDespesas(novaLista);
    salvarDespesas(novaLista);
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
      {localizacao && (
        <View style={styles.localizacaoContainer}>
          <Text style={styles.localizacaoTexto}>
            Localização atual: {localizacao.latitude.toFixed(2)}, {localizacao.longitude.toFixed(2)}
          </Text>
        </View>
      )}
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
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => abrirModalParaEditar(item, index)}>
            <View style={styles.item}>
              <Text style={styles.itemTitulo}>{item.titulo}</Text>
              <Text style={styles.itemValor}>Valor: R$ {item.valor}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <ExpoLink href="/estatisticas" style={styles.link}>
        <Text style={styles.linkText}>Ir para estatísticas</Text>
      </ExpoLink>
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
  localizacaoContainer: {
    padding: 10,
    backgroundColor: "#588157",
    borderRadius: 4,
    marginTop: 85,
  },
  localizacaoTexto: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
  },
  textButton: {
    color: "#FFFFFF",
    fontFamily: "Montserrat_500Medium",
  },
  button: {
    backgroundColor: "#226F54",
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 50,
    borderRadius: 4,
  },
  item: {
    padding: 15,
    marginTop: 5,
    backgroundColor: "#226F54",
    borderRadius: 4,
    borderColor: "#25A18E",
    marginBottom: 10,
    borderWidth: 3,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemTitulo: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  itemValor: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  link: {
    backgroundColor: "#226F54",
    borderRadius: 5,
    width: 150,
    padding: 16,
    alignItems: "center",
    marginBottom: 10,
    textAlign: "center"
    // marginTop: 20,
  },
  linkText: {
    color: "#FFFFFF",
  },
});

export default AddDespesa;
