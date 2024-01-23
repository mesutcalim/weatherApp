/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useState,useCallback} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  View,
} from 'react-native';

const App = () => {
  const [input,setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const api = {
    key:'${openweathermapToken}',
    baseUrl:'https://api.openweathermap.org/data/2.5/',
  }

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput("");
    axios({
      method: 'GET',
      url: `${api.baseUrl}weather?q=${input}&units=metric&appid=${api.key}`,
    }).then(res=>{
      setData(res.data);
    }).catch(e => console.dir(e))
    .finally(() => setLoading(false));
  },[input,api.key,api.baseUrl]);

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require('./assets/cloud.jpg')}
        resizeMode="cover"
        style={styles.root}>
          <View>
            <TextInput 
            placeholder='Bir Şehir Giriniz...'
            onChangeText={text => setInput(text)}
            value={input}
            placeholderTextColor={'#000'}
            style={styles.textInput}
            onSubmitEditing={fetchDataHandler} 
            />
          </View>
          {loading && (
            <View>
              <ActivityIndicator size={'large'} color="#000"/>
            </View>
          )}

          {data && (
            <View style={styles.infoView}>
              <Text style={styles.cityCountryText}>
              {`${data?.name}, ${data?.sys?.country}`}
              </Text>
              <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
              <Text style={styles.tempText}>{`${Math.round(data?.main?.temp)} °C`}</Text>
              <Text style={styles.minMaxText}>{`Min ${Math.round(data?.main?.temp_min)} °C / Max ${Math.round(data?.main?.temp_max)} °C`}</Text>
            </View>
          )}

        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput:{
    borderBottomWidth:3,
    padding: 5,
    paddingVertical:20,
    marginHorizontal:10,
    marginVertical:100,
    backgroundColor:'#fff',
    fontSize: 19,
    borderRadius: 16,
    borderBottomColor:'#df8e00',
  },
  infoView:{
    alignItems:'center',
  },
  cityCountryText:{
    color:'#fff',
    fontSize:40,
    fontWeight:'bold',
  },
  dateText:{
    color: '#fff',
    fontSize: 22,
    marginVertical:10,
  },
  tempText:{
    fontSize:45,
    color:'#fff',
    marginVertical:10,
  },
  minMaxText:{
    fontSize:22,
    color:'#fff',
    marginVertical:10,
    fontWeight:'500',
  },
});

export default App;
