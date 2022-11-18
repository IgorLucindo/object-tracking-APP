import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import database from '../../src/config/firebase.js';
import { css } from '../../assets/css/Css';

export default function QrCodeRegister2({ navigation, route }) {
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
  const [temp, setTemp] = useState(false);
  const [i, setI] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const { data } = route.params;

  useEffect(() => {
    var date = new Date().getDate()
    var month = new Date().getMonth()
    var year = new Date().getFullYear()
    var hours = new Date().getHours()
    var min = new Date().getMinutes()
    var sec = new Date().getSeconds()
    setCurrentDate(date + '/' + (month + 1) + '/' + year)
    setCurrentTime(year + '/' + ((month + 1) / 100) + '/' + (date / 100) + ' ' + (hours / 100) + ':' + (min / 100) + ':' + (sec / 100))
  }, []);

  useEffect(() => {
    const list = []

    database.collection('Produtos').orderBy('tempo_de_cadastro', 'desc').onSnapshot((query) => {
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setProdutos(list.filter(item => {
        if (data == item.qrcode) { return true }
        else { return false }
      }));
      setTemp(true)
    });
  }, []);

  useEffect(() => {
    if (temp) {
      if (produtos.length !== 0) {
        setInformacao0(produtos[i].produto)
        setInformacao1(produtos[i].lote)
        setInformacao2(produtos[i].comprado_por)
        setInformacao3(produtos[i].data_da_compra)
        setInformacao4(produtos[i].enviado_para)
        setInformacao5(produtos[i].data_de_envio)
        setInformacao6(produtos[i].informacoes_sobre_materiais_utilizados)
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
    }
  }, [temp, i]);

  function addTask() {
    if (informacao0 == null || informacao0 == '') { Alert.alert('Digite um produto') }
    else {
      database.collection('Produtos').add({
        produto: informacao0,
        lote: informacao1,
        comprado_por: informacao2,
        data_da_compra: informacao3,
        enviado_para: informacao4,
        data_de_envio: informacao5,
        informacoes_sobre_materiais_utilizados: informacao6,
        informacao7: informacao7,
        informacao8: informacao8,
        informacao9: informacao9,
        data_de_cadastro: currentDate,
        tempo_de_cadastro: currentTime,
        qrcode: data,
      })
    }
  }

  return (
    <ImageBackground style={css.container} source={require('../../assets/img/backgroundQrcoderegister.png')}>
      <View style={css.topContainer}>
        <Text style={[css.QrcodeText, { color: 'white' }]}>Escaneado</Text>
      </View>

      <View style={{ flex: 1, width: '100%' }}>
        <View style={{ position: 'absolute' }}>
          <TouchableOpacity style={css.QrCodeRepetirButton} onPress={() => navigation.navigate('QrCodeRegister', { show: false })}>
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
            <TextInput style={css.QrCodeContainerText} placeholder='Lote:'
              placeholderTextColor='gray' onChangeText={setInformacao1} value={informacao1} />
            <TextInput style={css.QrCodeContainerText} placeholder='Comprado por:'
              placeholderTextColor='gray' onChangeText={setInformacao2} value={informacao2} />
            <TextInput style={css.QrCodeContainerText} placeholder='Data da compra:'
              placeholderTextColor='gray' onChangeText={setInformacao3} value={informacao3} />
            <TextInput style={css.QrCodeContainerText} placeholder='Enviado para:'
              placeholderTextColor='gray' onChangeText={setInformacao4} value={informacao4} />
            <TextInput style={css.QrCodeContainerText} placeholder='Data de envio:'
              placeholderTextColor='gray' onChangeText={setInformacao5} value={informacao5} />
            <TextInput style={css.QrCodeContainerText} placeholder='Informações sobre materiais utilizados:'
              placeholderTextColor='gray' onChangeText={setInformacao6} value={informacao6} />
            <TextInput style={css.QrCodeContainerText} placeholder='Informação 7:'
              placeholderTextColor='gray' onChangeText={setInformacao7} value={informacao7} />
            <TextInput style={css.QrCodeContainerText} placeholder='Informação 8:'
              placeholderTextColor='gray' onChangeText={setInformacao8} value={informacao8} />
            <TextInput style={css.QrCodeContainerText} placeholder='Informação 9:'
              placeholderTextColor='gray' onChangeText={setInformacao9} value={informacao9} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      <View style={css.bottomContainer}>
        <View style={css.container}>
          {i > 0 &&
            <TouchableOpacity style={{ padding: 10 }} onPress={() => setI(i - 1)}>
              <AntDesign style={{ color: 'white' }} name='left' size={20} />
            </TouchableOpacity>
          }
        </View>
        <View style={{ flex: 3, alignItems: 'center' }}>
          <TouchableOpacity style={css.QrCodeRegisterButton}
            onPress={() => [addTask(), navigation.navigate('QrCodeRegister', { show: true })]}>
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
    </ImageBackground >
  );
}