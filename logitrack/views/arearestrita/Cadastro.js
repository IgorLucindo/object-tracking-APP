import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import MenuAreaRestrita from "../../assets/components/MenuAreaRestrita";
import config from '../../config/config';
import { css } from '../../assets/css/Css';

export default function Cadastro({ navigation }) {

    const address = config.origin;
    const [code, setCode] = useState(null);
    const [user, setUser] = useState(null);
    const [product, setProduct] = useState(null);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        randomCode();
    }, []);

    //Pegar o id do usuário
    async function getUser() {
        let json = JSON.parse(response);
        setUser(json.id);
    }

    //Gerar um código randômico
    async function randomCode() {
        let result = '';
        let length = 20;
        let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        setCode(result);
    }

    //Envio do formulário
    async function sendForm() {
        let response = await fetch(config.urlRoot + 'create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user,
                code: code,
                product: product,
                local: address
            })
        });
    }

    return (
        <View>
            <MenuAreaRestrita title='Cadastro' navigation={navigation} />

            <View style={{ top: 230 }}>
                <TouchableOpacity style={css.login__button} onPress={() => navigation.navigate('QrCodeRegister', { show: false })}>
                    <Text style={{ color: 'white' }}>Cadastrar QR Code</Text>
                </TouchableOpacity>
            </View>

            <View style={{ top: 250 }}>
                <TouchableOpacity style={css.login__button} onPress={() => navigation.navigate('QrCodeRegister', { show: false })}>
                    <Text style={{ color: 'white' }}>    Cadastrar NFC    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}