import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux'; // Import connect

const CustomerDetailScreen = ({ route, authToken }) => {
    const { customerId } = route.params;
    const [customer, setCustomer] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        axios.get(`https://kami-backend-5rs0.onrender.com/Customers/${customerId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}` 
            }
        })
        .then(response => {
            setCustomer(response.data);
        })
        .catch(error => {
            console.error('Error fetching customer details:', error);
        });
    }, [customerId, authToken]);

    const openMenu = () => {
        Alert.alert(
            "Customer Actions",
            "Select an action",
            [ 
                { text: "Edit", onPress: () => navigation.navigate('EditCustomerScreen', { customerId })},
                { text: "Delete", onPress: () => navigation.navigate('DeleteCustomerScreen', { customerId}) },
                { text: "Cancel", style: "cancel" },
            ],
            { cancelable: true }
        );
    };

    if (!customer) {
        return <Text>Loading customer data...</Text>;
    }

    return (
      <ScrollView style={styles.container}>
         <TouchableOpacity onPress={openMenu} style={styles.menuButton}>
                <Text style={styles.menuText}>☰</Text>
            </TouchableOpacity>
      <Text style={styles.title}>{customer.name}</Text>
      <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Phone: </Text>
          <Text style={styles.infoContent}>{customer.phone}</Text>
      </View>
      <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Loyalty Status: </Text>
          <Text style={styles.infoContent}>{customer.loyalty}</Text>
      </View>
      <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Total Spent: </Text>
          <Text style={styles.infoContent}>{customer.totalSpent}</Text>
      </View>
      <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Status: </Text>
          <Text style={styles.infoContent}>{customer.status}</Text>
      </View>
      {/* Render Transactions if available */}
      {customer.transactions && customer.transactions.map((transaction, index) => (
          <View key={index} style={styles.transactionSection}>
              <Text style={styles.transactionTitle}>Transaction {index + 1}</Text>
              <Text style={styles.transactionDetail}>ID: {transaction.id}</Text>
              <Text style={styles.transactionDetail}>Date: {new Date(transaction.createdAt).toLocaleDateString()}</Text>
              <Text style={styles.transactionDetail}>Total Price: {transaction.price}</Text>
              <Text style={styles.transactionDetail}>Status: {transaction.status}</Text>
          </View>
      ))}
  </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
},
infoSection: {
    flexDirection: 'row',
    marginBottom: 10,
},
infoLabel: {
    fontWeight: 'bold',
},
infoContent: {
    flex: 1,
},
transactionSection: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
},
transactionTitle: {
    fontWeight: 'bold',
},
transactionDetail: {
    marginTop: 5,
},
    menuButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        zIndex: 1, 
    },
    menuText: {
        fontSize: 20,
    },
   
});
const mapStateToProps = (state) => ({
    authToken: state.auth.authToken 
});

export default connect(mapStateToProps)(CustomerDetailScreen);
