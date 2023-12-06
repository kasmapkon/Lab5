import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const TransactionScreen = ({ route, navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://kami-backend-5rs0.onrender.com/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleTransactionPress = (_id) => {
    navigate('DetailTransactionScreen', { _id });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleTransactionPress(item._id)}>
      <View style={styles.itemContainer}>
        <Text style={styles.name}>{item.id}</Text>
        {item.services.map((service) => (
          <View key={service._id} style={styles.serviceContainer}>
            <Text style={styles.serviceName}>-{service.name}</Text>
          </View>
        ))}
        <Text style={styles.price}>Total Price: {item.price}</Text>
        <Text style={styles.customer}>Customer: {item.customer.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách giao dịch</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigate('AddTransactionScreen')}>
        <Text style={styles.addButtonText}>Thêm giao dịch</Text>
      </TouchableOpacity>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'right',
    alignSelf: 'flex-end',
    position: 'absolute',
    top: '50%',
  },
  serviceContainer: {
    marginVertical: 4,
  },
  serviceName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  servicePrice: {
    fontSize: 12,
    color: 'green',
  },
  serviceQuantity: {
    fontSize: 12,
  },
  status: {
    fontSize: 14,
    color: 'blue',
  },
  customer: {
    fontSize: 14,
    color: 'grey',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransactionScreen;
