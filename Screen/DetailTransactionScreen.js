import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import axios from 'axios';

const DetailTransactionScreen = ({ route, navigation }) => {
  const { _id } = route.params;
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(`https://kami-backend-5rs0.onrender.com/transactions/${_id}`);
        setTransaction(response.data);
      } catch (error) {
        console.error('Error fetching transaction:', error);
      }
    };

    fetchTransaction();
  }, [_id]);

  const handleDeleteTransaction = () => {
    navigation.navigate('DeleteTransactionScreen', { transactionId: _id });
  };

  const handlePayment = () => {
    alert('Payment initiated');
  };

  if (!transaction) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Detail Transaction</Text>

      <View style={styles.serviceContainer}>
        <Text style={styles.label}>Transaction Code:</Text>
        <Text style={styles.value}>{transaction.id}</Text>

        <Text style={styles.label}>Customer:</Text>
        <Text style={styles.value}>{transaction.customer.name}</Text>

        <Text style={styles.label}>Creation Time:</Text>
        <Text style={styles.value}>{new Date(transaction.createdAt).toLocaleString()}</Text>
      </View>

      <View style={styles.serviceContainer}>
        <Text style={styles.label}>Services List:</Text>
        {transaction.services.map((service) => (
          <View key={service._id} style={styles.detailItem}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.servicePrice}>Price: {service.price}đ</Text>
            <Text style={styles.serviceQuantity}>Quantity: {service.quantity}</Text>
          </View>
        ))}
      </View>

      <View style={styles.serviceContainer}>
        <Text style={styles.label}>Total Cost:</Text>
        <Text style={styles.price}>{transaction.price}đ</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Payment" onPress={handlePayment} />
        <Button title="Delete Transaction" onPress={handleDeleteTransaction} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'blue',
  },
  detailItem: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
  },
  serviceContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    backgroundColor: '#f7f7f7',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 14,
    color: 'green',
  },
  serviceQuantity: {
    fontSize: 14,
  },
  price: {
    fontSize: 18,
    color: 'red',
    textAlign: 'right',
    alignSelf: 'flex-end',
    marginTop: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
});

export default DetailTransactionScreen;
