import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [services, setServices] = useState([]);
  const navigation = useNavigation(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://kami-backend-5rs0.onrender.com/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  const handlePress = () => {
    navigation.navigate('AddScreen');
  };

  const navigateToDetails = (itemId) => {
    navigation.navigate('DetailsScreen', { itemId: itemId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToDetails(item._id)}>
      <View style={styles.itemContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách dịch vụ</Text>
      <Button title="Add" onPress={handlePress} />
      <FlatList
        data={services}
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
  homeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 30,
    padding: 15,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30, 
    backgroundColor: 'blue', 
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
