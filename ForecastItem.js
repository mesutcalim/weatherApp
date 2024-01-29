import {Text,View,StyleSheet} from "react-native";
import dayjs from 'dayjs';
const ForecastItem = ({ weatherData }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.temp}>{Math.round(weatherData?.main?.temp)}°</Text>
            <Text style={styles.date}>
                {dayjs(weatherData?.dt * 1000).format('ddd ha')}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({

    temp: {
        fontFamily: 'InterBlack',
        fontSize: 35,
        color: 'white',
        marginVertical: 10,
    },
    date: {
        fontFamily: 'Inter',
        color: 'ghostwhite',
        fontSize: 16,
    },
});

export default ForecastItem;