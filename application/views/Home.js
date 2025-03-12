import React from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { css } from '../assets/css/Css';

export default function Home({ navigation }) {
  return (
    <ImageBackground style={{ flex: 1 }} source={require('../assets/img/backgroundHome.png')}>
      <StatusBar barStyle='light-content' />

      <View style={{ flex: 1 }}>
        <View style={css.homeImageContainer}>
          <Image style={{ width: 130, height: 110, bottom: 10 }} source={require('../assets/img/logomarca1.png')} />
        </View>

        <View style={{ alignItems: 'flex-end', top: 10, right: 10 }}>
          <TouchableOpacity style={css.buttonHome1} onPress={() => navigation.navigate('Login')}>
            <Text style={{ top: 10, right: 10, color: 'white', fontSize: 15, fontWeight: '700' }}>Login</Text>
            <Icon style={{ left: 35, bottom: 9, color: 'white' }} name="sign-in" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 0.2 }}>
        <Text style={css.homeText}>Rastreie seus produtos</Text>
      </View>

      <View style={css.homeContainer}>
        <View>
          <View style={css.buttonHome2} />
          <TouchableOpacity style={css.buttonHome3} onPress={() => navigation.navigate('QrCodeReader')}>
            <Image style={{ width: 65, height: 80 }} source={require('../assets/img/nfcIcon.png')} />
            <Text style={css.buttonText}>NFC</Text>
          </TouchableOpacity>
        </View>

        <View>
          <View style={css.buttonHome2} />
          <TouchableOpacity style={css.buttonHome3} onPress={() => navigation.navigate('QrCodeReader')}>
            <Image style={{ width: 90, height: 90 }} source={require('../assets/img/qrcodeIcon.png')} />
            <Text style={css.buttonText}>QR Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}