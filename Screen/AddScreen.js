
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

const AddScreen = ({ authToken }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    console.log('AuthToken in AddScreen:', authToken);
  }, [authToken]);

  const handleAddService = async () => {
    try {
      const newService = {
        name: name,
        price: price,
      };

      const response = await axios.post('https://kami-backend-5rs0.onrender.com/services', newService, {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      });

      console.log('Response:', response.data);

      setName('');
      setPrice('');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setName(text)}
        value={name}
      />

      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setPrice(text)}
        value={price}
      />

      <Button title="Add Service" onPress={handleAddService} />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    authToken: state.auth.authToken,
  };
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default connect(mapStateToProps)(AddScreen);
