import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from "react-native";

const ModalDespesa = ({ 
  visible, 
  onClose, 
  onSave, 
  tituloDespesa, 
  setTitulo 
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Título da despesa</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a despesa"
            value={tituloDespesa}
            onChangeText={setTitulo}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={onSave}
          >
            <Text style={styles.textButton}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}
          >
            <Text style={styles.textButton}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  textButton: {
    color: "#FFFFFF",
  },
});

export default ModalDespesa;
