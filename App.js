import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, Modal, Image, TouchableOpacity, ScrollView, Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ZikirMatigi = () => {
  const [zikirCount, setZikirCount] = useState(0);
  const [zikirList, setZikirList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    // Kaydedilen zikirleri yükle
    loadZikirList();
  }, []);

  const loadZikirList = async () => {
    try {
      const list = await AsyncStorage.getItem('zikirList');
      if (list !== null) {
        setZikirList(JSON.parse(list));
      }
    } catch (error) {
      console.log('Zikir listesi yüklenirken bir hata oluştu:', error);
    }
  };



  const deleteZikir = async (index) => {
    try {
      const updatedList = [...zikirList];
      updatedList.splice(index, 1);
      setZikirList(updatedList);
      await AsyncStorage.setItem('zikirList', JSON.stringify(updatedList));
    } catch (error) {
      console.log('Zikir silinirken bir hata oluştu:', error);
    }
  };

  const resetZikirCount = () => {
    setZikirCount(0);
  };



  return (
    <View style={styles.container}>
      <Image style={styles.zikirImage} source={require('C:/Users/Mert_/OneDrive/Masaüstü/React-native/test/assets/zikirmatik.png')} />
      <Text style={styles.title}>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</Text>

      <View style={styles.inputContainer}>
        {zikirCount >= 0 && (
          <Text style={styles.zikirCount}>{zikirCount}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.arttır} title="Zikiri Artır" onPress={() => setZikirCount(zikirCount + 1)}>
        <Text></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.reset} title="Reset" onPress={() => resetZikirCount(zikirCount + 1)}>
        <Text></Text>
      </TouchableOpacity>


      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#009000",
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  zikirList: {
    flex: 1,
    width: '100%',
  },
  zikirItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
  },
  zikirName: {
    fontSize: 16,
  },
  zikirCount: {
    fontSize: 34,
    fontWeight: 'bold',
    top: 305,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    height: 60,
    width: '80%',
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  zikirImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
    position: 'absolute',
    top: 370
  },
  arttır: {
    width: 90,
    height: 90,
    borderRadius: 99,
    top: 333,
    zIndex: 1,

  },
  buttonContainer: {
    display: 'flex',
    gap: 20,
    flexDirection: 'row'
  },
  reset: {
    width: 30,
    height: 30,
    borderRadius: 99,
    top: 205,
    zIndex: 1,
    left: 50,
  },
  kaydet: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 10,
    marginTop: -140,
    width: 100,
    display: "flex",
    alignItems: "center",

  },
  savetext: {
    color: "white",
    fontSize:16
  },
  records:{
    backgroundColor: "#0d6ef4",
    padding: 12,
    color:"white", 
    borderRadius: 10,
    marginTop: -10,
  },
  recordstext:{
    color:"white",
    fontSize:16,
  }
});

export default ZikirMatigi;

