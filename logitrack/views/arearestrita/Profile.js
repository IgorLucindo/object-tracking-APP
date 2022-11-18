import React from 'react';
import { View } from 'react-native';
import { css } from '../../assets/css/Css';
import MenuAreaRestrita from "../../assets/components/MenuAreaRestrita";

export default function Profile({ navigation }) {

    async function logout() {
        navigation.navigate('Login');
    }

    return (
        <View style={[css.container, css.containerTop]}>
            <MenuAreaRestrita title='Perfil' navigation={navigation} />
        </View>
    );
}
