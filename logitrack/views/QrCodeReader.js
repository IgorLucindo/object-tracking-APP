import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, Modal, ImageBackground, FlatList, ScrollView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import database from '../src/config/firebase.js';
import { css } from '../assets/css/Css';

export default function QrCodeReader({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [text, setText] = useState('Aproxime o QR Code');
  const [data, setData] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [show, setShow] = useState(false);
  const [temp, setTemp] = useState(false);
  const [list, setList] = useState([]);
  const [i, setI] = useState(0);

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
    setData(data);
    setText('Escaneado');
    setProdutos(list.filter(item => {
      if (data == item.qrcode) { return true; }
      else { return false; }
    }));
    setTemp(true)
  };

  useEffect(() => {
    database.collection('Produtos').orderBy('tempo_de_cadastro', 'desc').onSnapshot((query) => {
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id, status: false });
      });
    });
    setProdutos(list);
    setList(list);
  }, []);

  useEffect(() => {
    if (temp) {
      if (produtos.length == 0) { setShow(2) }
      else { setShow(1) }
    }
  }, [temp]);

  function escanearNovamente() {
    setData(null)
    setText('Aproxime o QR Code')
    setShow(null)
    setTemp(false)
  }

  function abrirFechar(n) {
    if (n) { return false }
    else { return true }
  }

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
    <ImageBackground style={css.container}
      source={require('../assets/img/backgroundQrcodereader.png')}>
      <View style={css.topContainer}>
        <Text style={[css.QrcodeText, { color: 'white' }]}>{text}</Text>
      </View>

      <View style={css.barcodebox}>
        {show !== 1 && <BarCodeScanner onBarCodeScanned={show == 1 ? undefined : handleBarCodeScanned}
          style={{ height: '100%', width: 380 }} />}
      </View>

      <Modal transparent={true} visible={show == 1}>
        <View style={{ flex: 1, marginTop: 80 }}>
          <View style={{ position: 'absolute' }}>
            <TouchableOpacity style={css.QrCodeRepetirButton} onPress={() => escanearNovamente()}>
              <Icon style={{ color: '#ff3333' }} name='repeat' size={15} />
              <Text style={{ fontSize: 17, fontWeight: '600', color: '#ff3333' }}> repetir</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
              <View style={[css.container, { flexDirection: 'row', width: '80%', paddingVertical: 10 }]}>
                <AntDesign style={{ right: 10, color: 'white' }} name='qrcode' size={20} />
                <Text style={{ color: 'white' }}>{data}</Text>
              </View>

              <View style={{ width: '100%', top: 15, borderBottomWidth: 0.7, borderColor: 'white', }} />
            </View>

            <View style={{ height: 30 }} />

            <FlatList style={{ width: '100%' }} data={produtos} extraData={i} renderItem={({ item }) => {
              return (
                <>
                  <View style={{ padding: 10 }}>
                    <TouchableOpacity style={css.QrCodeContainerText3}
                      onPress={() => [item.status = abrirFechar(item.status), setI(i + 1)]} >
                      {item.status && <AntDesign style={{ color: '#ff3333' }} name='down' size={20} />}
                      {!item.status && <AntDesign style={{ color: 'white' }} name='right' size={20} />}
                      <Text style={{ fontSize: 20, fontWeight: '600', color: 'white', }}> cadastrado em: {item.data_de_cadastro}</Text>
                    </TouchableOpacity>
                  </View>

                  {item.status && <>
                    <View style={css.QrCodeContainerText}>
                      <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>Produto: {item.produto}</Text>
                    </View>
                    <View style={css.QrCodeContainerText}>
                      <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>Lote: {item.lote}</Text>
                    </View>
                    <View style={css.QrCodeContainerText}>
                      <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>Comprado por: {item.comprado_por}</Text>
                    </View>
                    <View style={css.QrCodeContainerText}>
                      <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>Data da compra: {item.data_da_compra}</Text>
                    </View>
                    <View style={css.QrCodeContainerText}>
                      <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>Enviado para: {item.enviado_para}</Text>
                    </View>
                    <View style={css.QrCodeContainerText}>
                      <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>Data de envio: {item.data_de_envio}</Text>
                    </View>
                    <View style={css.QrCodeContainerText}>
                      <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>Informações sobre materiais utilizados: {item.informacoes_sobre_materiais_utilizados}</Text>
                    </View>
                    <View style={css.QrCodeContainerText}>
                      <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>Informação7: {item.informacao7}</Text>
                    </View>
                    <View style={css.QrCodeContainerText}>
                      <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>Informação8: {item.informacao8}</Text>
                    </View>
                    <View style={css.QrCodeContainerText}>
                      <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>Informação9: {item.informacao9}</Text>
                    </View>
                  </>}
                </>)
            }} />
          </ScrollView>
        </View>
      </Modal>

      <Modal transparent={true} visible={show == 2}>
        <View style={[css.container, { backgroundColor: '#000000aa', marginTop: 80 }]}>
          <TouchableOpacity style={{ position: 'absolute', width: '100%', height: '100%' }} onPress={() => escanearNovamente()} />
          <View style={[css.QrCodeContainer, { justifyContent: 'center', alignItems: 'center', top: 10 }]}>
            <Icon style={{ color: 'red', top: 25 }} name='qrcode' size={50} />
            <AntDesign style={{ opacity: 0.7, color: 'red', bottom: 40 }} name='close' size={80} />
            <Text style={[css.QrcodeText, { color: 'red', bottom: 20 }]}>QR Code não cadastrado</Text>
          </View>
        </View>
      </Modal>
    </ImageBackground >
  );
}