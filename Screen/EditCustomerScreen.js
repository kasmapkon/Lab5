import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';

const EditCustomerScreen = ({ route, authToken }) => { 
  const { customerId } = route.params;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    console.log('AuthToken in EditCustomerScreen:', authToken);
  }, [authToken]);

  const handleUpdate = async () => {
    try {
      await axios.put(`https://kami-backend-5rs0.onrender.com/customers/${customerId}`, 
        {
          name: name,
          phone: phone,
        },
        {
          headers: {
            'Authorization': `Bearer ${authToken}` 
          }
        }
      );
    } catch (error) {
      console.error('Error updating customer:', error);

    }
  };
  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={styles.input} />
      <Button title="Update Customer" onPress={handleUpdate} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    authToken:state.auth.authToken , 
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default connect(mapStateToProps)(EditCustomerScreen);
