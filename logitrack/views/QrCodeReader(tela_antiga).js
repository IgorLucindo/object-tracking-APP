import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, Modal, StatusBar, FlatList } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import database from '../src/config/firebase.js';
import { css } from '../assets/css/Css';

export default function QrCodeReader({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState(null);
  const [text, setText] = useState('Aproxime o QR Code');
  const [produtos, setProdutos] = useState([]);
  const [n, setN] = useState(true);

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
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText('Escaneado');
    setData(data)
    console.log('Type: ' + type + '\nData: ' + data);
  };

  function escanearNovamente() {
    setScanned(false)
    setText('Aproxime o QR Code')
    setData(null)
    setN(true)
  };

  useEffect(() => {
    database.collection("Produtos").onSnapshot((query) => {
      const list = [];
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setProdutos(list);
    });
  }, []);

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
    <View style={css.container}>
      <StatusBar barStyle='dark-content' />

      <View style={[css.container, { width: '100%', backgroundColor: '#e8e8e8' }]}>
        <Text style={css.QrcodeText}>{text}</Text>
      </View>

      <View style={css.barcodebox}>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={{ height: 600, width: 380 }} />
      </View>

      <Modal style={{ flex: 1 }} transparent={true} visible={scanned}>
        <View style={{ flex: 1 }} />

        <View style={{ backgroundColor: '#000000aa', flex: 7.2 }}>

          <View style={[css.container, { flexDirection: 'row', padding: 40, bottom: 80 }]}>
            <Icon style={{ right: 10, color: 'white' }} name="qrcode" size={20} />
            <Text style={{ color: 'white' }}>{data}</Text>
          </View>

          <TouchableOpacity style={{ position: 'absolute', width: '100%', height: '100%' }} onPress={() => escanearNovamente()} />

          <View style={css.modal}>

            <View style={css.container}>
              <View style={css.QrCodeContainer}>
                <FlatList data={produtos} renderItem={({ item }) => {
                  if (item.qrcode == data) {
                    setN(false)
                    return (
                      <>
                        <Text style={css.QrCodeContainerText}>Produto: {item.produto}</Text>
                        <Text style={css.QrCodeContainerText}>Informacao1: {item.informacao1}</Text>
                        <Text style={css.QrCodeContainerText}>Informacao2: {item.informacao2}</Text>
                        <Text style={css.QrCodeContainerText}>Informacao3: {item.informacao3}</Text>
                        <Text style={css.QrCodeContainerText}>Informacao4: {item.informacao4}</Text>
                        <Text style={css.QrCodeContainerText}>Informacao5: {item.informacao5}</Text>
                      </>
                    )
                  }
                }} />
                {n && <View style={[css.container, { bottom: 40 }]}>
                  <Icon style={{ color: 'red' }} name="qrcode" size={50} />
                  <AntDesign style={{ bottom: 65, opacity: 0.7, color: 'red' }} name="close" size={80} />
                  <Text style={[css.QrcodeText, { bottom: 60, color: 'red', margin: 5, textAlign: 'center' }]}>QR Code não cadastrado</Text>
                </View>}
              </View>

              <View style={{ bottom: 80 }}>
                <Button title={'Escanear Novamente?'} onPress={() => escanearNovamente()} color='tomato' />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}