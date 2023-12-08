import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Button, Input } from '@rneui/base';
import database from '@react-native-firebase/database'

export default function Cadastro(props) {

    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')

    const handleCadastro = () => {
        console.log('click');
        database()
            .ref('/contatos')
            .push({
                nome: nome,
                telefone: telefone,
                email: email
            })
            .then(() => props.click());
    }

    return (
        <View style={{ display: 'flex', flex: 1 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', margin: 12 }}>Cadastro</Text>
            <View>
                <Input onChangeText={text => { setNome(text) }} placeholder='Nome' />
                <Input onChangeText={text => { setTelefone(text) }} placeholder='Telefone' />
                <Input onChangeText={text => { setEmail(text) }} placeholder='E-mail' />
                
                <View style={{ marginBottom: 10 }}>
                    <Button onPress={() => { handleCadastro() }} title={'Salvar'} />
                </View>
                
                <Button onPress={() => { props.click() }} title={'Voltar'} />

            </View>
        </View>
    );
}