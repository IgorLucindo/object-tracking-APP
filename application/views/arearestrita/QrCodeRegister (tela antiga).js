import React, { useState, useEffect } from 'react';
import {
  Text, View, TextInput, Button, TouchableOpacity, Modal, Alert,
  ScrollView, ImageBackground, KeyboardAvoidingView, Platform
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import database from '../../src/config/firebase.js';
import { css } from '../../assets/css/Css';

export default function QrCodeRegister2({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [text, setText] = useState('Aproxime o QR Code');
  const [informacao0, setInformacao0] = useState(null);
  const [informacao1, setInformacao1] = useState(null);
  const [informacao2, setInformacao2] = useState(null);
  const [informacao3, setInformacao3] = useState(null);
  const [informacao4, setInformacao4] = useState(null);
  const [informacao5, setInformacao5] = useState(null);
  const [informacao6, setInformacao6] = useState(null);
  const [informacao7, setInformacao7] = useState(null);
  const [informacao8, setInformacao8] = useState(null);
  const [informacao9, setInformacao9] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [list, setList] = useState([]);
  const [temp, setTemp] = useState(false);
  const [updateDate, setUpdateDate] = useState(false);
  const [i, setI] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

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

  useEffect(() => {
    var date = new Date().getDate()
    var month = new Date().getMonth()
    var year = new Date().getFullYear()
    var hours = new Date().getHours()
    var min = new Date().getMinutes()
    var sec = new Date().getSeconds()
    setCurrentDate(date + '/' + (month + 1) + '/' + year)
    setCurrentTime(year + '/' + (month + 1) + '/' + date + ' ' + hours + ':' + min + ':' + sec)
    setUpdateDate(false)
  }, [updateDate]);

  useEffect(() => {
    database.collection('Produtos').orderBy('tempo_de_cadastro', 'desc').onSnapshot((query) => {
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setProdutos(list);
      setList(list);
    });
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setText('Escaneado')
    setData(data);
    setProdutos(list.filter(item => {
      if (data == item.qrcode) { return true; }
      else { return false; }
    }));
    setTemp(true)
  };

  useEffect(() => {
    if (temp) {
      if (produtos.length !== 0) {
        setInformacao0(produtos[i].produto)
        setInformacao1(produtos[i].informacao1)
        setInformacao2(produtos[i].informacao2)
        setInformacao3(produtos[i].informacao3)
        setInformacao4(produtos[i].informacao4)
        setInformacao5(produtos[i].informacao5)
        setInformacao6(produtos[i].informacao6)
        setInformacao7(produtos[i].informacao7)
        setInformacao8(produtos[i].informacao8)
        setInformacao9(produtos[i].informacao9)
      }
      else {
        setInformacao0(null)
        setInformacao1(null)
        setInformacao2(null)
        setInformacao3(null)
        setInformacao4(null)
        setInformacao5(null)
        setInformacao6(null)
        setInformacao7(null)
        setInformacao8(null)
        setInformacao9(null)
      }
      setShow(1)
    }
  }, [temp, i]);

  function addTask() {
    if (informacao0 == null || informacao0 == '') { Alert.alert('Digite um produto') }
    else {
      database.collection('Produtos').add({
        produto: informacao0,
        informacao1: informacao1,
        informacao2: informacao2,
        informacao3: informacao3,
        informacao4: informacao4,
        informacao5: informacao5,
        informacao6: informacao6,
        informacao7: informacao7,
        informacao8: informacao8,
        informacao9: informacao9,
        data_de_cadastro: currentDate,
        tempo_de_cadastro: currentTime,
        qrcode: data,
      })
    }
  }

  function escanearNovamente() {
    setData(null)
    setText('Aproxime o QR Code')
    setShow(null)
    setTemp(false)
    setI(0)
    setUpdateDate(true)
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
    <ImageBackground style={css.container} source={require('../../assets/img/backgroundQrcoderegister.png')}>
      <View style={css.topContainer}>
        <Text style={[css.QrcodeText, { color: 'white' }]}>{text}</Text>
      </View>

      <View style={css.barcodebox}>
        {show !== 1 && <BarCodeScanner onBarCodeScanned={show == 1 ? undefined : handleBarCodeScanned} style={{ height: '100%', width: 380 }} />}
      </View>

      <Modal transparent={true} visible={show == 1}>
        <View style={{ flex: 1, marginTop: 80 }}>
          <View style={{ position: 'absolute' }}>
            <TouchableOpacity style={css.QrCodeRepetirButton} onPress={() => escanearNovamente()}>
              <Icon style={{ color: '#ff3333' }} name='repeat' size={15} />
              <Text style={{ fontSize: 17, fontWeight: '600', color: '#ff3333' }}> repetir</Text>
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={80} style={{ flex: 1 }}>
            <ScrollView>
              <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                <View style={[css.container, { flexDirection: 'row', width: '80%', paddingVertical: 10 }]}>
                  <AntDesign style={{ right: 10, color: 'white' }} name='qrcode' size={20} />
                  <Text style={{ color: 'white' }}>{data}</Text>
                </View>

                <View style={{ width: '100%', top: 15, borderBottomWidth: 0.7, borderColor: 'white', }} />
              </View>

              <View style={{ height: 70 }} />

              <TextInput style={css.QrCodeContainerText} placeholder='Nome do Produto:'
                placeholderTextColor='gray' onChangeText={setInformacao0} value={informacao0} />
              <TextInput style={css.QrCodeContainerText} placeholder='Informação 1:'
                placeholderTextColor='gray' onChangeText={setInformacao1} value={informacao1} />
              <TextInput style={css.QrCodeContainerText} placeholder='Informação 2:'
                placeholderTextColor='gray' onChangeText={setInformacao2} value={informacao2} />
              <TextInput style={css.QrCodeContainerText} placeholder='Informação 3:'
                placeholderTextColor='gray' onChangeText={setInformacao3} value={informacao3} />
              <TextInput style={css.QrCodeContainerText} placeholder='Informação 4:'
                placeholderTextColor='gray' onChangeText={setInformacao4} value={informacao4} />
              <TextInput style={css.QrCodeContainerText} placeholder='Informação 5:'
                placeholderTextColor='gray' onChangeText={setInformacao5} value={informacao5} />
              <TextInput style={css.QrCodeContainerText} placeholder='Informação 6:'
                placeholderTextColor='gray' onChangeText={setInformacao6} value={informacao6} />
              <TextInput style={css.QrCodeContainerText} placeholder='Informação 7:'
                placeholderTextColor='gray' onChangeText={setInformacao7} value={informacao7} />
              <TextInput style={css.QrCodeContainerText} placeholder='Informação 8:'
                placeholderTextColor='gray' onChangeText={setInformacao8} value={informacao8} />
              <TextInput style={css.QrCodeContainerText} placeholder='Informação 9:'
                placeholderTextColor='gray' onChangeText={setInformacao9} value={informacao9} />
            </ScrollView>
          </KeyboardAvoidingView>

          <View style={css.bottomContainer}>
            <View style={css.container}>
              {i > 0 &&
                <TouchableOpacity style={{ padding: 10 }} onPress={() => setI(i - 1)}>
                  <AntDesign style={{ color: 'white' }} name='left' size={20} />
                </TouchableOpacity>
              }
            </View>
            <View style={{ flex: 3, alignItems: 'center' }}>
              <TouchableOpacity style={css.QrCodeRegisterButton} onPress={() => [addTask(), setShow(2)]}>
                <Text style={{ color: 'white', fontSize: 17, fontWeight: '600', }}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
            <View style={css.container}>
              {i < produtos.length - 1 &&
                <TouchableOpacity style={{ padding: 10 }} onPress={() => setI(i + 1)}>
                  <AntDesign style={{ color: 'white' }} name='right' size={20} />
                </TouchableOpacity>
              }
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent={true} visible={show == 2}>
        <View style={[css.container, { backgroundColor: '#000000aa', marginTop: 80 }]}>
          <TouchableOpacity style={{ position: 'absolute', width: '100%', height: '100%' }} onPress={() => escanearNovamente()} />
          <View style={[css.QrCodeContainer, { justifyContent: 'center', alignItems: 'center', top: 10 }]}>
            <AntDesign style={{ bottom: 30, opacity: 0.7, color: 'green' }} name='checkcircle' size={70} />
            <Text style={[css.QrcodeText, { bottom: 10, color: 'green', margin: 5 }]}>QR Code cadastrado</Text>
          </View>
        </View>
      </Modal>
    </ImageBackground >
  );
}