import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const SettingScreen = () => {
  // Giả sử bạn có một số tùy chọn để chuyển đổi
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.settingOption}>
        <Text style={styles.optionLabel}>Dark Mode</Text>
        <Switch 
          value={isDarkMode} 
          onValueChange={setIsDarkMode} 
        />
      </View>
      <View style={styles.settingOption}>
        <Text style={styles.optionLabel}>Enable Notifications</Text>
        <Switch 
          value={isNotificationsEnabled} 
          onValueChange={setIsNotificationsEnabled} 
        />
      </View>
      {/* Thêm các tùy chọn cài đặt khác tại đây */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  settingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionLabel: {
    fontSize: 18,
  },
});

export default SettingScreen;
