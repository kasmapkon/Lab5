import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './reducers/store';
import { Provider } from 'react-redux';
// Import các màn hình
import LoginScreen from './Screen/LoginScreen';
import HomeScreen from './Screen/HomeScreen';
import TransactionScreen from './Screen/TransactionScreen';
import SettingScreen from './Screen/SettingScreen';
import AddScreen from './Screen/AddScreen';
import AddTransactionScreen from './Screen/AddTransactionScreen';
import CustomerDetailScreen from './Screen/CustomerDetailScreen';
import CustomersScreen from './Screen/CustomersDetailScreen';
import DeleteCustomerScreen from './Screen/DeleteCustomerScreen';
import DeleteTransactionScreen from './Screen/DeleteTransactionScreen';
import DetailsScreen from './Screen/DetailsScreen';
import DetailTransactionScreen from './Screen/DetailTransactionScreen';
import EditCustomerScreen from './Screen/EditCustomerScreen';
import UpdateScreen from './Screen/UpdateScreen';
import AddCustomerScreen from './Screen/AddCustomerScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Transaction" component={TransactionScreen} />
    <Tab.Screen name="Customer" component={CustomersScreen} />
    <Tab.Screen name="Setting" component={SettingScreen} />
  </Tab.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="AddScreen" component={AddScreen} />
      <Stack.Screen name="AddTransactionScreen" component={AddTransactionScreen} />
      <Stack.Screen name="CustomerDetailScreen" component={CustomerDetailScreen} />
      <Stack.Screen name="CustomersScreen" component={CustomersScreen} />
      <Stack.Screen name="DeleteCustomerScreen" component={DeleteCustomerScreen} />
      <Stack.Screen name="DeleteTransactionScreen" component={DeleteTransactionScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      <Stack.Screen name="DetailTransactionScreen" component={DetailTransactionScreen} />
      <Stack.Screen name="EditCustomerScreen" component={EditCustomerScreen} />
      <Stack.Screen name="UpdateScreen" component={UpdateScreen} />
      <Stack.Screen name="AddCustomerScreen" component={AddCustomerScreen} />
      
    </Stack.Navigator>
  </NavigationContainer>
);

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
