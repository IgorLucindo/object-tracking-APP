import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { css } from '../../assets/css/Css';

export default function QrCodeRegister({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const { show } = route.params;

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ data }) => {
    navigation.navigate('QrCodeRegister2', { data: data })
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={css.container}>
        <Text>Requisitando acesso para a câmera</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={css.container}>
        <Text style={{ margin: 10 }}>Sem acesso para a câmera</Text>
        <Button title={'Permitir Câmera'} onPress={() => askForCameraPermission()} />
      </View>)
  }

  return (
    <ImageBackground style={css.container} source={require('../../assets/img/backgroundQrcoderegister.png')}>
      <View style={css.topContainer}>
        <Text style={[css.QrcodeText, { color: 'white' }]}>Aproxime o QR Code</Text>
      </View>

      <View style={css.barcodebox}>
        <BarCodeScanner onBarCodeScanned={false ? undefined : handleBarCodeScanned} style={{ height: '100%', width: 380 }} />
      </View>

      <Modal transparent={true} visible={show}>
        <View style={[css.container, { backgroundColor: '#000000aa', marginTop: 80 }]}>
          <TouchableOpacity style={{ position: 'absolute', width: '100%', height: '100%' }}
            onPress={() => navigation.setParams({ show: false })} />
          <View style={[css.QrCodeContainer, { justifyContent: 'center', alignItems: 'center', top: 10 }]}>
            <AntDesign style={{ bottom: 30, opacity: 0.7, color: 'green' }} name='checkcircle' size={70} />
            <Text style={[css.QrcodeText, { bottom: 10, color: 'green', margin: 5 }]}>QR Code cadastrado</Text>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}