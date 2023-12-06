import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const UpdateScreen = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleUpdateService = async () => {
    try {
      const serviceToUpdate = { id, name, price };
      const response = await axios.put(`https://kami-backend-5rs0.onrender.com/services/${id}`, serviceToUpdate);
      console.log('Response:', response.data);
      setId('');
      setName('');
      setPrice('');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID:</Text>
      <TextInput style={styles.input} onChangeText={setId} value={id} />
      <Text style={styles.label}>Name:</Text>
      <TextInput style={styles.input} onChangeText={setName} value={name} />
      <Text style={Styles.label}>Price:</Text>
      <TextInput style={styles.input} onChangeText={setPrice} value={price} />
      <Button title="Update Service" onPress={handleUpdateService} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontSize: 18, marginBottom: 8 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, paddingHorizontal: 8 },
});

export default UpdateScreen;
