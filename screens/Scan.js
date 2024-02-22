import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Alert} from 'react-native';
import { Camera } from 'expo-camera';
import { QRCodeContext } from '../QRCodeContext'; 
import PrimaryButton from '../component/PrimaryButton';
import { Ionicons } from '@expo/vector-icons'; 

const Scan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { addQRCodeToHistory } = useContext(QRCodeContext); 

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const  QRscan=async(data)=>{
    try {
      await addQRCodeToHistory(data);
      navigation.goBack()
    } catch (error) {
      console.error('Error saving QR code to history:', error);
    }
  }
    const handleBarCodeScanned = async ({ type, data }) => {
      setScanned(true);
      Alert.alert('QR Scanned', 'Do you want to save data', [
        {
          text: 'NO',
          style: 'cancel',
        },
        {text: 'YES', onPress: () => QRscan(data)},
      ]);
  }
  

  const handleScanAgain = () => {
    setScanned(false); 
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!scanned ? ( 
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          onBarCodeScanned={handleBarCodeScanned}
        >
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Scan QR Code</Text>
            <PrimaryButton onPress={() => navigation.goBack()}>Cancel</PrimaryButton>
          </View>
        </Camera>
      ) : (
        <View style={styles.scanAgainContainer}>
          
          <PrimaryButton onPress={handleScanAgain} ><Ionicons name="scan-circle" size={24} color="white" />Scan Again</PrimaryButton>
          <View style={{margin:12}}>
            <PrimaryButton onPress={() => navigation.goBack()}>Cancel</PrimaryButton>
            </View>
          
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  overlayText: {
    fontSize: 24,
    color: 'white',
  },
  scanAgainContainer: {
    flex:2,
    marginTop:150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#f0e68c',
    borderRadius:44,
    marginLeft:20,
    marginRight:20,
    marginBottom:150,
    elevation:18,
    
  },
  scanAgainText: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Scan;
