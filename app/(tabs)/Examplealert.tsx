// import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// export default function ExampleAlert(){
//     return(
//         <View style={styles.caixa}>
//             <TouchableOpacity style={styles.button} onPress={() => {
//                 Alert.alert('Funcionou!', 'O botão foi clicado!');}}>
//                 <Text style={styles.text}>Olá</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     caixa: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'

//     },
//     text: {
//         color: '#FFFFFF'
//     },
//     button: {
//         backgroundColor: '#386641'
//     }
// })

import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [despesa, setDespesa] = useState('');
  const [listaDespesas, setListaDespesas] = useState([]);

  // Função para adicionar despesa à lista
  const adicionarDespesa = () => {
    if (despesa.trim().length > 0) {
      setListaDespesas([...listaDespesas, despesa]);
      setDespesa('');
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Botão para abrir o modal */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Adicionar Despesa</Text>
      </TouchableOpacity>

      {/* Modal para adicionar uma despesa */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Nova Despesa</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome da despesa"
              value={despesa}
              onChangeText={setDespesa}
            />
            <TouchableOpacity style={styles.saveButton} onPress={adicionarDespesa}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Lista de despesas */}
      <FlatList
        data={listaDespesas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c1121f',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  item: {
    padding: 15,
    backgroundColor: '#226F54',
    borderRadius: 1,
    borderColor: '#25A18E',
    marginBottom: 10,
    borderWidth: 3,
    elevation: 2, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemText: {
    fontSize: 16,
  },
});

export default App;
