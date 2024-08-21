import { useNavigation } from '@react-navigation/native';
import React, { ReactNode, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../contexts/ThemeContext';

interface HeaderProps {
  title: string;
  canGoBack?: boolean;
  right?: ReactNode
}

const Header = ({ title, canGoBack, right }: HeaderProps) => {
  const navigation = useNavigation()
  const { theme } = useContext(ThemeContext)

  return (
    <View style={styles.container}>
      {canGoBack && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.goBackContainer,
            { backgroundColor: theme.background }
          ]}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={25}
            color={theme.primaryText}
          />
        </TouchableOpacity>
      )}

      <Text
        style={[
          styles.title,
          { color: theme.primaryText }
        ]}
      >
        {title}
      </Text>

      {right && right}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goBackContainer: {
    paddingRight: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
    flex: 1,
    marginBottom: 4
  }
});

export default Header;
