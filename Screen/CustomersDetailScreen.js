
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CustomersScreen = ({ route, navigation }) => {
    const [services, setServices] = useState([]);
    const { navigate } = useNavigation();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://kami-backend-5rs0.onrender.com/customers');
          setServices(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
    const handlePress = () => {
      navigation.navigate('AddCustomerScreen');
    };
    const handleTransactionPress = (_id) => {
      navigate('CustomerDetailScreen', { customerId: _id });
    };
    
    
  
  
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => handleTransactionPress(item._id)}>
        <View style={styles.itemContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.phone}</Text>
          <Text style={styles.price}>{item.totalSpent}</Text>
        </View>
      </TouchableOpacity>
    );
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Danh sách khách hàng</Text>
        <FlatList
          data={services}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
        <Button title="Add" onPress={handlePress} />
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
      color: 'green',
    },
  
  });
export default CustomersScreen;
