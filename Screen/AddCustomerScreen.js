import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';

const CustomerScreen = ({ authToken }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [customerDetail, setCustomerDetail] = useState(null);
  const [viewMode, setViewMode] = useState('add'); // 'add' hoặc 'detail'

  useEffect(() => {
    if (viewMode === 'detail' && customerId) {
      const fetchCustomer = async () => {
        try {
          const response = await axios.get(`https://kami-backend-5rs0.onrender.com/Customers/${customerId}`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          setCustomerDetail(response.data);
        } catch (error) {
          console.error('Error fetching customer:', error);
        }
      };

      fetchCustomer();
    }
  }, [customerId, authToken, viewMode]);

  const handleAddCustomer = async () => {
    try {
      await axios.post('https://kami-backend-5rs0.onrender.com/customers', { name, phone }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setName('');
      setPhone('');
      alert('Customer added successfully');
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Switch to Add Customer" onPress={() => setViewMode('add')} />
      <Button title="Switch to View Customer" onPress={() => setViewMode('detail')} />

      {viewMode === 'add' ? (
        <View>
          <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
          <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={styles.input} />
          <Button title="Add Customer" onPress={handleAddCustomer} />
        </View>
      ) : (
        <View>
          <TextInput placeholder="Customer ID" value={customerId} onChangeText={setCustomerId} style={styles.input} />
          <Button title="Fetch Customer" onPress={() => setCustomerId(customerId)} />
          {customerDetail && (
            <View>
              <Text>Name: {customerDetail.name}</Text>
              <Text>Phone: {customerDetail.phone}</Text>
            </View>
          )}
        </View>
      )}
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
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default connect(mapStateToProps)(CustomerScreen);
