
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { setAuthToken } from '../actions/authActions';

const LoginScreen = ({ navigation, setAuthToken }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://kami-backend-5rs0.onrender.com/auth', {
        phone,
        password,
      });
      const authToken = response.data.token;
      setAuthToken(authToken); 
      navigation.navigate('MainTabs');
    } catch (error) {
      console.error('API request error:', error);
    }
  };
  

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone"
        onChangeText={(text) => setPhone(text)}
        value={phone}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthToken: (token) => dispatch(setAuthToken(token)),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default connect(null, mapDispatchToProps)(LoginScreen);
