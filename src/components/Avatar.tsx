import React, { useContext } from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

interface AvatarProps {
  name: string;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Avatar = ({
  name,
  size = 45,
  backgroundColor,
  textColor,
  style,
  textStyle,
}: AvatarProps) => {
  const { theme } = useContext(ThemeContext)

  const initials = name[0].toUpperCase();

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: backgroundColor || theme.cardBackground
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: size / 2.5,
            color: textColor || theme.secondaryText
          },
          textStyle
        ]}
      >
        {initials}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Quicksand-Bold',
    marginBottom: 4
  },
});
