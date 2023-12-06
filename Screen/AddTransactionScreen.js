import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';

const AddTransactionScreen = ({ navigation, authToken }) => {
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedServices, setSelectedServices] = useState({});
  const [serviceQuantities, setServiceQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);

  const userID = "640e9882a6bb10819ee5db99"; 

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://kami-backend-5rs0.onrender.com/customers', {
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get('https://kami-backend-5rs0.onrender.com/services', {
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchCustomers();
    fetchServices();
  }, [authToken]);

  const handleServiceSelect = (serviceId) => {
    setSelectedServices(prev => ({ ...prev, [serviceId]: !prev[serviceId] }));
  };

  const updateServiceQuantity = (serviceId, delta) => {
    setServiceQuantities(prevQuantities => ({
      ...prevQuantities,
      [serviceId]: Math.max(0, (prevQuantities[serviceId] || 0) + delta)
    }));
  };

  const calculateTotalPrice = () => {
    let total = 0;
    services.forEach(service => {
      if (selectedServices[service._id]) {
        total += service.price * (serviceQuantities[service._id] || 1);
      }
    });
    setTotalPrice(total);
  };

  const handleAddTransaction = async () => {
    const selectedServicesArray = Object.entries(selectedServices)
      .filter(([_, isSelected]) => isSelected)
      .map(([serviceId]) => ({
        _id: serviceId,
        quantity: serviceQuantities[serviceId] || 1,
        userID: userID 
      }));

    try {
      await axios.post('https://kami-backend-5rs0.onrender.com/transactions', {
        CustomerId: selectedCustomerId,
        Services: selectedServicesArray
      }, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      navigation.navigate('TransactionScreen');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={openDropdown}
        value={selectedCustomerId}
        items={customers.map(customer => ({ label: customer.name, value: customer._id }))}
        setOpen={setOpenDropdown}
        setValue={setSelectedCustomerId}
        setItems={setCustomers}
        zIndex={3000}
        style={styles.dropdown}
      />

      <ScrollView style={styles.scrollView}>
        {services.map(service => (
          <View key={service._id} style={styles.serviceItem}>
            <Text style={styles.serviceText}>{service.name} - ${service.price}</Text>
            <View style={styles.quantityContainer}>
              <Button title="-" onPress={() => updateServiceQuantity(service._id, -1)} />
              <Text style={styles.quantityText}>{serviceQuantities[service._id] || 0}</Text>
              <Button title="+" onPress={() => updateServiceQuantity(service._id, 1)} />
            </View>
          </View>
        ))}
      </ScrollView>

      <Button title="Calculate Total Price" onPress={calculateTotalPrice} />
      <Text style={styles.totalPrice}>Total Price: ${totalPrice}</Text>
      <Button title={`Confirm Transaction - Total: $${totalPrice}`} onPress={handleAddTransaction} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dropdown: {
    marginBottom: 15,
  },
  scrollView: {
    marginVertical: 10,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  serviceText: {
    flex: 2,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  quantityText: {
    marginHorizontal: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

const mapStateToProps = (state) => ({
  authToken: state.auth.authToken
});

export default connect(mapStateToProps)(AddTransactionScreen);
