import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput, Button, FlatList, ImageBackground, StatusBar,ScrollView} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from "axios";

export default function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState(null);


    const [input, setInput] = useState("");

    const api = {
        key: '07d45cb17a2a1948498dd91ff9a0bc43',
        baseUrl: 'https://api.openweathermap.org/data/2.5/',
    }

    useEffect(() => {
        if (city) {
            axios(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api.key}&units=metric&lang=tr`
            )
                .then((res) => {
                    const newArray = res.data.list.splice(0, 7);
                    setWeatherData(newArray);
                }).catch(error => console.log(error));
        } else {
            Geolocation.getCurrentPosition(
                position => {
                    const {latitude, longitude} = position.coords;
                    axios(
                        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=7&appid=${api.key}&units=metric&lang=tr`
                    )
                        .then((res) => {
                            const newArray = res.data.list.splice(0, 7);
                            setWeatherData(newArray);
                            setCity(res.data.city.name)
                        }).catch((e) => {
                        console.log(e);
                    })
                },
                error => console.log(error),
                {enableHighAccuracy: false, timeout: 20000,}
            );
        }
    }, [city]);

    if (!weatherData) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Hava durumu verileri yükleniyor...</Text>

            </View>
        );
    }

    async function description(desc) {
        if (desc === 'overcast clouds') {
            return 'kapalı bulutlu';
        }
    };
    const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
    const today = new Date().getDay();
    const futureDays = days.slice(today - 1).concat(days.slice(0, today + 6));
    const flatData = [

        {
            day: futureDays[0],
            desc: weatherData[0].weather[0].description,
            temp: weatherData[0].main.temp,
        },
        {
            day: futureDays[1],
            desc: weatherData[1].weather[0].description,
            temp: weatherData[1].main.temp,
        },
        {
            day: futureDays[2],
            desc: weatherData[2].weather[0].description,
            temp: weatherData[2].main.temp,
        },
        {
            day: futureDays[3],
            desc: weatherData[3].weather[0].description,
            temp: weatherData[3].main.temp,
        },
        {
            day: futureDays[4],
            desc: weatherData[4].weather[0].description,
            temp: weatherData[4].main.temp,
        },
        {
            day: futureDays[5],
            desc: weatherData[5].weather[0].description,
            temp: weatherData[5].main.temp,
        },
        {
            day: futureDays[6],
            desc: weatherData[6].weather[0].description,
            temp: weatherData[6].main.temp,
        },
    ];
    const ForecastItem = ({forecast}) => {
        return (
            <View style={styles.container2}>
                <Text style={styles.day}>
                    {forecast.day}
                </Text>
                <Text style={styles.temp}>{Math.round(forecast?.temp)}°</Text>

                <Text style={styles.desc}>{forecast.desc}</Text>

            </View>
        );
    };


    return (
        <ImageBackground
            source={require('./assets/cloud.jpg')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>


                <TextInput
                    style={styles.input}
                    placeholder="Şehir adı girin"
                    onChangeText={text => setInput(text)}
                    value={input}
                    //onChangeText={(text) => fetchCities(input)}
                    onSubmitEditing={(text) => setCity(input)}
                />
                <Button title="Hava Durumunu Göster" onPress={() => setCity(input)}/>
               <Text>{"\n"}</Text>
                <Text style={styles.title}>{city} Hava Durumu</Text>
                <Text style={styles.text}>{weatherData[0].weather[0].description}</Text>
                <Text style={styles.text}>Sıcaklık: {weatherData[0].main.temp} °C</Text>
                <Text style={styles.text}>Nem: {weatherData[0].main.humidity}%</Text>
                <Text style={styles.text}>Rüzgar Hızı: {weatherData[0].wind.speed} m/s</Text>

                <FlatList
                    data={flatData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{
                        flexGrow: 0,
                        height: 150,
                        marginBottom: 40,
                    }}
                    contentContainerStyle={{
                        gap: 10,
                        paddingHorizontal: 10,
                    }}
                    renderItem={({item}) => <ForecastItem forecast={item}/>}
                />

            </View>
            <View style={{ marginBottom:1,height:20,alignItems:'center',backgroundColor:'rgba(33,21,37,0.52)'}}>

                <View><Text style={{ color: '#fff'}}>Made by Mesut Çalım</Text></View>
            </View>
            <StatusBar/>


        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    loadingText: {
        fontSize: 18,
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    flatList: {

        flexGrow: 0,
        height: 150,
        marginBottom: 40,
    },
    container2: {
        backgroundColor: 'rgba(243,8,8,0.33)',
        padding: 10,
        aspectRatio: 3 / 4,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderColor: 'gainsboro',
        borderWidth: StyleSheet.hairlineWidth,
    },
    temp: {
        fontFamily: 'InterBlack',
        fontSize: 35,
        color: 'white',
        marginVertical: 10,
    },
    day: {
        fontFamily: 'Inter',
        color: '#0f305b',
        fontSize: 18,
    },
    desc:{
        fontFamily: 'Inter',
        color: '#0f305b',
        fontSize:14,
    }
});

