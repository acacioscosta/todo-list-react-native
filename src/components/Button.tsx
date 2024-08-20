import { ReactNode, useContext } from 'react';
import { StyleSheet, TouchableOpacityProps, TouchableOpacity, Text } from 'react-native';
import { spacing } from '../theme';
import { ThemeContext } from '../contexts/ThemeContext';

interface ButtonProps extends TouchableOpacityProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  title: string;
}

export const Button = ({ title, leftIcon, rightIcon, ...rest }: ButtonProps) => {
  const { theme } = useContext(ThemeContext)

  return (
    <TouchableOpacity
      style={[
        styles.inputContainer,
        {
          borderColor: theme.borderColor,
          backgroundColor: theme.buttonBackground
        }
      ]}
      {...rest}
    >
      {leftIcon && leftIcon}

      <Text
        style={[
          styles.title,
          { color: theme.buttonText }
        ]}
      >
        {title}
      </Text>

      {rightIcon && rightIcon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: spacing.s,
    elevation: 1
  },
  title: {
    fontSize: 18,
    fontFamily: 'Quicksand-SemiBold',
  }
});
