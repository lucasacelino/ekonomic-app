import Header from "@/components/Header";
import { StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts, Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import { useState } from "react";

const Home = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
  });

  const [modalVisible, setModalVisible] = useState(false); 
  const [titulo, setTitulo] = useState(""); 
  const [valor, setValor] = useState("")
  const [listaDespesas, setListaDespesas] = useState([]);

  // Função para adicionar despesa à lista
  const adicionarDespesa = () => {
    if (titulo.trim().length > 0) {
      setListaDespesas([...listaDespesas, { titulo: titulo, valor: valor}]);
      setTitulo('');
      setValor('');
      setModalVisible(false);
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)} 
      >
        <Text style={styles.textButton}>Adicionar Despesa</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} 
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Titulo da despesa</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a despesa"
              value={titulo}
              onChangeText={setTitulo}
            />
            <Text style={styles.modalTitle}>Valor da despesa</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a despesa"
              value={valor}
              onChangeText={setValor}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={adicionarDespesa}
            >
              <Text style={styles.textButton}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textButton}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FlatList
        data={listaDespesas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitulo}>{item.titulo}</Text>
            <Text style={styles.itemValor}>Valor: R$ {item.valor}</Text>
          </View>
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#226f54",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#da2c38",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
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

export default Home;