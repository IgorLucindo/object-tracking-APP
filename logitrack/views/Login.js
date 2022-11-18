import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Image, Text, View, Alert } from 'react-native';
import database from '../src/config/firebase.js';
import { css } from '../assets/css/Css';

export default function Login({ navigation }) {
	const [list, setList] = useState([]);
	const [logins, setLogins] = useState([]);
	const [display, setDisplay] = useState('none');
	const [temp, setTemp] = useState(false);
	const [usuario_digitado, setUsuario_digitado] = useState('none');
	const [senha_digitado, setSenha_digitado] = useState('none');

	useEffect(() => {
		database.collection('Logins').onSnapshot((query) => {
			query.forEach((doc) => {
				list.push({ ...doc.data(), id: doc.id });
			});
		});
		setLogins(list);
		setList(list)
	}, []);

	useEffect(() => {
		if (temp) {
			if (logins.length == 0) { Alert.alert('Usuário ou senha inválidos!') }
			else { navigation.navigate('AreaRestrita') }
			setTemp(false)
		}
	}, [temp]);

	function log() {
		setLogins(list.filter(item => {
			if (usuario_digitado == item.nome && senha_digitado == item.senha) { return true }
			else { return false }
		}));
		setTemp(true)
	};

	return (
		<KeyboardAvoidingView style={[css.container, { backgroundColor: "black" }]}
			behavior={Platform.OS == "ios" ? "padding" : "height"} >
			<Image style={css.loginImage} source={require('../assets/img/icon.png')} />

			<Text style={css.login__msg(display)}>Usuário ou senha inválidos!</Text>

			<View style={{ width: '40%' }}>
				<TextInput style={css.login__input} placeholder='Usuário:'
					onChangeText={(text) => setUsuario_digitado(text)} />

				<TextInput style={css.login__input} placeholder='Senha:' secureTextEntry={true}
					onChangeText={(text) => setSenha_digitado(text)} />

				<TouchableOpacity style={css.login__button} onPress={() => log()}>
					<Text style={css.login__buttonText}>Entrar</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}