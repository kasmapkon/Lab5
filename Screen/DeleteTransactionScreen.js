import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';

const DeleteTransactionScreen = ({ route, authToken }) => {
  const { transactionId } = route.params;

  const handleDelete = async () => {
    console.log(transactionId);
    try {
      await axios.delete(`https://kami-backend-5rs0.onrender.com/transactions/${transactionId}`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      alert('Transaction deleted successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Are you sure you want to delete this transaction?</Text>
      <Button title="Delete Transaction" onPress={handleDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  authToken: state.auth.authToken
});

export default connect(mapStateToProps)(DeleteTransactionScreen);
