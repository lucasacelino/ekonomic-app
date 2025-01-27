import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '@/components/Header';

const Estatisticas = () => {
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [listaDespesas, setListaDespesas] = useState([]);

  useEffect(() => {
    carregarDespesas();
  }, []);

  const carregarDespesas = async () => {
    try {
      const despesasSalvas = await AsyncStorage.getItem('despesas');
      if (despesasSalvas) {
        const despesas = JSON.parse(despesasSalvas);
        setListaDespesas(despesas);
        const total = despesas.reduce((acc, item) => acc + parseFloat(item.valor), 0);
        setTotalDespesas(total);
      }
    } catch (error) {
      console.error('Erro ao carregar despesas:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.item}>
      </View> */}
      <Header />
      <View style={styles.item}>
        {/* <Text>Olá</Text> */}
        <Text style={styles.title}>Estatísticas das Despesas</Text>
      <Text style={styles.stat}>Total de Despesas: R$ {totalDespesas.toFixed(2)}</Text>
      <Text style={styles.stat}>Número de Despesas: {listaDespesas.length}</Text>

      </View>
      <Link href="/AddDespesa" style={styles.btnLinkBack}>
        <Text>Voltar</Text>
      </Link>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF'
  },
  stat: {
    fontSize: 18,
    marginBottom: 10,
    color: '#FFFFFF'
  },
  item: {
    borderColor: '#25A18E',
    backgroundColor: "#226F54",
    padding: 15,
    borderWidth: 4
  },
  btnLinkBack: {
    backgroundColor: "#226F54",
    padding: 10,
    color: "#FFFFFF",
    marginTop: 10,
    borderRadius: 5
  }
});

export default Estatisticas;
