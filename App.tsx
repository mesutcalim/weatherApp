import { useEffect, useState } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    ImageBackground,StatusBar,FlatList
} from 'react-native';
import ForecastItem from "./ForecastItem.js";
import GetLocation, {Location} from 'react-native-get-location'
//import * as Location from 'expo-location';
// import { FlatList } from 'react-native-gesture-handler';
// import ForecastItem from '@/components/day8/ForecastItem';
//import { Stack } from 'routerexpo-';
// import LottieView from 'lottie-react-native';

const [selectedCity, setSelectedCity] = useState(null);



// if (selectedCity === null && navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//         const lat = position.coords.latitude;
//         const long = position.coords.longitude;
//
//         const url = "https://geocode.xyz/" + lat + "," + long + "?json=1";
//         const xhr = new XMLHttpRequest();
//         xhr.open("GET", url, true);
//         xhr.onload = function () {
//             if (xhr.status == 200) {
//                 const response = JSON.parse(xhr.responseText);
//                 const city = response.city;
//                 if (city !== "Throttled! See geocode.xyz/pricing") {
//                     setSelectedCity(city);
//                 }
//             }
//         };

const BASE_URL = `https://api.openweathermap.org/data/2.5`;
const OPEN_WEATHER_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_KEY;
const bgImage =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg';

type MainWeather = {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
};

type Weather = {
    name: string;
    main: MainWeather;
    weather: [
        {
            id: string;
            main: string;
            description: string;
            icon: string;
        }
    ];
};

export type WeatherForecast = {
    main: MainWeather;
    dt: number;
};

function LottieView(props: {
    loop: boolean,
    style: { width: number; aspectRatio: number },
    source: any,
    autoPlay: boolean
}) {
    return null;
}

const WeatherScreen = () => {

    const [location, setLocation] = useState<Location>();
    const [errorMsg, setErrorMsg] = useState('');
    const [weather, setWeather] = useState<Weather>();
    const [forecast, setForecast] = useState<WeatherForecast[]>();

    useEffect(() => {
        if (location) {
            fetchWeather();
            fetchForecast();
        }
    }, [location]);

    useEffect(() => {
        (async () => {
           await setLocation(location);
        })();
    }, []);

    const fetchWeather = async () => {
        if (!location) {
            return;
        }

        const results = await fetch(
            `${BASE_URL}/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${OPEN_WEATHER_KEY}&units=metric`
        );
        const data = await results.json();
        // console.log(JSON.stringify(data, null, 2));
        setWeather(data);
    };

    const fetchForecast = async () => {
        // api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}
        if (!location) {
            return;
        }

        const results = await fetch(
            `${BASE_URL}/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${OPEN_WEATHER_KEY}&units=metric`
        );
        const data = await results.json();
        // console.log(JSON.stringify(data, null, 2));
        setForecast(data.list);
    };

    if (!weather) {
        return <ActivityIndicator />;
    }

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <ImageBackground source={{ uri: bgImage }} style={styles.container}>
            <View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
            />

            {/*<Stack.Screen options={{ headerShown: false }} />*/}

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <LottieView
                    source={
                        weather.weather[0].main === 'Rain'
                            ? require('./assets/lottie/rain.json')
                            : require('./assets/lottie/sunny.json')
                    }
                    style={{
                        width: 200,
                        aspectRatio: 1,
                    }}
                    loop
                    autoPlay
                />
                <Text style={styles.location}>{weather.name}</Text>
                <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
                <Text style={styles.location}>{weather.weather[0].main}</Text>
            </View>

            {/*<FlatList*/}
            {/*    data={forecast}*/}
            {/*    horizontal*/}
            {/*    showsHorizontalScrollIndicator={false}*/}
            {/*    style={{*/}
            {/*        flexGrow: 0,*/}
            {/*        height: 150,*/}
            {/*        marginBottom: 40,*/}
            {/*    }}*/}
            {/*    contentContainerStyle={{*/}
            {/*        gap: 10,*/}
            {/*        paddingHorizontal: 10,*/}
            {/*    }}*/}
            {/*    //renderItem={({ item }) => <ForecastItem forecast={item} />}*/}
            {/*/>*/}

            <StatusBar />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    location: {
        fontFamily: 'Inter',
        fontSize: 30,
        color: 'lightgray',
    },
    temp: {
        fontFamily: 'InterBlack',
        fontSize: 150,
        color: '#FEFEFE',
    },
});

export default WeatherScreen;