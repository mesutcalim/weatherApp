import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';

const [cities, setCities] = useState([]);

const fetchCities = async (input) => {
    const response = await fetch(`https://api.api-ninjas.com/v1/city?name=${input}`, {
        headers: {
            'X-Api-Key': '',
        },
    });
    const data = await response.json();
    setCities(data);
};

const renderItem = ({ item }) => (
    <Text style={styles.item}>{item.name}</Text>
);

return (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Şehir adı girin"
            onChangeText={(text) => fetchCities(text)}
        />
        <FlatList
            data={cities}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    </View>
);