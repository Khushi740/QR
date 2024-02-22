import React, { useState, useLayoutEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { QRCodeContext } from '../QRCodeContext'; 
import { Ionicons } from '@expo/vector-icons'; 
import PrimaryButton from '../component/PrimaryButton';

const HomeScreen = ({ navigation }) => {
  const { history, loadHistory } = useContext(QRCodeContext); 
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true); 

  useLayoutEffect(() => {
    const fetchData = async () => {
      await loadHistory();
      setLoading(false); 
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('QRCodeHistory', { qrCode: item })}>
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.content.length > 10? `${item.content.substring(0, 12)}...` : item.content}</Text>
        
      </View>
    </TouchableOpacity>
  );
  
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadHistory();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={() => navigation.navigate('QRScanner')}>
          <Ionicons name="scan-circle" size={24} color="white" /> Scan QR Code
        </PrimaryButton>
      </View>
      
      <Text style={styles.headerText}>History</Text>
      
      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="#4CAF50" />
      ) : (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 3,
    overflow:'hidden'
  },
  itemText: {
    fontSize: 16,
    color: '#333333',
  },
  loadingIndicator: {
    marginTop: 50,
  },
});

export default HomeScreen;
