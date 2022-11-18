/*import { ScaleFromCenterAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';*/
import { StyleSheet } from 'react-native';

export const css = StyleSheet.create({
  homeImageContainer: {
    flex: 0.25,
    alignItems: 'center',
    backgroundColor: 'black',
    shadowOffset: { x: 2, y: 0 },
    shadowOpacity: 0.5,
    shadowColor: 'black',
    shadowRadius: 10,
  },
  homeText: {
    position: 'absolute',
    fontSize: 30,
    color: 'white',
    fontWeight: '700',
    marginRight: 100,
    bottom: 10,
    left: 20,
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonHome1: {
    height: 30,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 8,
  },
  homeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonHome2: {
    height: 160,
    width: 120,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    opacity: 0.3,
    shadowOffset: { x: 2, y: 0 },
    shadowOpacity: 1,
    shadowColor: 'white',
    shadowRadius: 5,
  },
  buttonHome3: {
    height: 160,
    width: 120,
    bottom: 200,
    left: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    position: 'absolute',
    top: 140,
    left: 20,
    color: 'black',
    fontSize: 15,
    fontWeight: '700'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPage: {
    backgroundColor: 'orange',
    padding: 20,
  },
  modal: {
    flex: 1,
    backgroundColor: '#e8e8e8',
  },
  loginImage: {
    width: '45%',
    height: '25%',
    bottom: 50,
    left: 15
  },
  login__msg: (text = 'none') => ({
    fontWeight: "bold",
    fontSize: 22,
    color: "red",
    marginTop: 0,
    marginBottom: 15,
    display: text
  }),
  login__form: {
    width: "80%"
  },
  login__input: {
    backgroundColor: "#fff",
    fontSize: 19,
    padding: 7,
    marginBottom: 15,
    borderRadius: 5,
  },
  login__button: {
    padding: 10,
    backgroundColor: "#E53E3E",
    alignSelf: "center",
    borderRadius: 5,
  },
  login__buttonText: {
    fontWeight: "bold",
    fontSize: 22,
    color: "white"
  },
  edit__button: {
    padding: 12,
    backgroundColor: "#E53E3E", /* se ficar ruim, troca essa cor*/
    alignSelf: "center",
    borderRadius: 5
  },
  area__menu: {
    flexDirection: 'row',
    paddingTop: 40,
    paddingBottom: 10,
    width: '100%',
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button__home2: {
    textAlign: 'left'
  },
  area__tab: {
    backgroundColor: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  containerTop: {
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  area__title: {
    width: '80%',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  },
  button__logout: {
    textAlign: 'right'
  },
  qr__code: (display = 'flex') => ({
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    justifyContent: 'center',
    display: display
  }),
  qr__form: (display = 'none') => ({
    width: '100%',
    display: display
  }),
  barcodebox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  QrCodeContainer: {
    width: 330,
    height: 300,
    bottom: 120,
    borderRadius: 20,
    backgroundColor: 'white',
    opacity: 0.8,
    shadowOffset: { x: 2, y: 0 },
    shadowOpacity: 0.4,
    shadowColor: 'black',
    shadowRadius: 10,
  },
  QrCodeContainerText: {
    paddingVertical: 8,
    marginBottom: 20,
    marginHorizontal: 20,
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
    borderBottomWidth: 0.5,
    opacity: 0.8,
    borderColor: 'white',
  },
  QrCodeContainerText3: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    width: 320,
    left: 10,
    borderRadius: 10,
    backgroundColor: '#333333',
  },
  QrCodeContainerText2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    shadowOffset: { x: 2, y: 0 },
    shadowOpacity: 1,
    shadowColor: 'black',
    shadowRadius: 10,
  },
  QrcodeText: {
    fontSize: 30,
    fontWeight: '600',
  },
  QrCodeRegisterButton: {
    alignItems: 'center',
    paddingVertical: 5,
    width: 100,
    backgroundColor: "#ff3333",
    borderRadius: 10,
  },
  QrCodeRegisterButton_telaAntiga: {
    padding: 15,
    bottom: 150,
    backgroundColor: "#E53E3E",
    alignSelf: "center",
    borderRadius: 30,
  },
  qr__code__button: {
    bottom: 50,
    left: 110,
    width: 50,
    height: 50,
  },
  QrCodeRepetirButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    bottom: 45,
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: '100%',
    backgroundColor: 'black',
    shadowOffset: { x: 2, y: 0 },
    shadowOpacity: 0.5,
    shadowColor: 'black',
    shadowRadius: 10,
  },
  bottomContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'black',
    shadowOffset: { x: 2, y: 0 },
    shadowOpacity: 0.5,
    shadowColor: 'black',
    shadowRadius: 10,
  },
});