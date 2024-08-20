import { useContext, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing } from '../theme';
import { ThemeContext } from '../contexts/ThemeContext';

interface FloatTabBarProps {
  onAddPress: () => void
}

const FloatTabBar = ({ onAddPress }: FloatTabBarProps) => {
  const { isDark, toggleTheme, theme } = useContext(ThemeContext)

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.tabBar,
          {
            backgroundColor: theme.floatTabBarBackground,
            borderColor: theme.borderColor
          }
        ]}
      >
        <TouchableOpacity
          style={styles.tabButton}
          onPress={toggleTheme}
        >
          <Icon
            name={isDark ? 'sunny-outline' : 'moon-outline'}
            size={32}
            color={theme.floatTabBarText}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={onAddPress}
        >
          <Icon
            name="add-circle-outline"
            size={32}
            color={theme.floatTabBarText}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tabBar: {
    width: Dimensions.get('window').width / 2.5,
    flexDirection: 'row',
    borderRadius: 50,
    paddingVertical: 10,
    elevation: 5,
    borderWidth: 1,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default FloatTabBar;
