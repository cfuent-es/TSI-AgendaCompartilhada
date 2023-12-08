import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FAB, ListItem } from '@rneui/base';
import database from '@react-native-firebase/database';

export default function Lista(props) {

    const [listaContatos, setListaContatos] = useState([]);

    useEffect(() => {
        database()
            .ref('/contatos')
            .once('value')
            .then(snapshot => {
                const contatos = Object.values(snapshot.val());
                setListaContatos(contatos);
            })
    }, []);

    return (
        <View style={{ display: 'flex', flex: 1 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', margin: 12 }}>Agenda Compartilhada</Text>
            <View>
                {
                    listaContatos.map(data =>
                        <ListItem style={{ marginBottom: 20 }}>
                            <ListItem.Content>
                                <ListItem.Title>{data.nome}</ListItem.Title>
                                <ListItem.Subtitle>{data.telefone}</ListItem.Subtitle>
                                <ListItem.Subtitle>{data.email}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                }
            </View>  
            <FAB
                visible={true}
                title='+'
                color="green"
                placement='right'
                onPress={() => { props.click() }}
            />
        </View>
    );
}