import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';

const DetailsScreen = ({ route, navigation }) => {
  const [details, setDetails] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`https://kami-backend-5rs0.onrender.com/services/${route.params.itemId}`);
        setDetails(response.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, [route.params.itemId]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDelete = async () => {
    try {
      
      await axios.delete(`https://kami-backend-5rs0.onrender.com/services/${route.params.itemId}`);
     
      toggleModal();
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  if (!details) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Service name: </Text>
      <Text style={styles.price}>{details.name}</Text>
      <Text style={styles.header}>Price: </Text>
      <Text style={styles.price}>{details.price}</Text>
      <Text style={styles.header}>Creator: </Text>
      <Text style={styles.price}>{details.createdBy}</Text>
      <Text style={styles.header}>Time: </Text>
      <Text style={styles.price}>{details.createdAt}</Text>
      <Text style={styles.header}>Final update: </Text>
      <Text style={styles.price}>{details.updatedAt}</Text>

      
      <TouchableOpacity onPress={toggleModal} style={styles.deleteButton}>
        <Text style={{ color: 'white' }}>Delete Service</Text>
      </TouchableOpacity>

    
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modal}>
          <Text>Bạn có muốn xóa không?</Text>
          <TouchableOpacity onPress={handleDelete} style={styles.button}>
            <Text>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal} style={styles.button}>
            <Text>No</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  price: {
    fontSize: 14,
    color: 'green',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
});

export default DetailsScreen;
