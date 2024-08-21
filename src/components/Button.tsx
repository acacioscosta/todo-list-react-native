import { ReactNode, useContext } from 'react';
import { StyleSheet, TouchableOpacityProps, TouchableOpacity, Text } from 'react-native';
import { spacing } from '../theme';
import { ThemeContext } from '../contexts/ThemeContext';

interface ButtonProps extends TouchableOpacityProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  title: string;
  variant?: 'primary' | 'outline' | 'warning';
}

export const Button = ({ title, leftIcon, rightIcon, variant = 'primary', ...rest }: ButtonProps) => {
  const { theme } = useContext(ThemeContext);

  let buttonContainer = {}
  let titleStyle = {}

  if (variant === 'primary') {
    buttonContainer = {
      backgroundColor: theme.buttonBackground
    }

    titleStyle = {
      color: theme.buttonText
    }
  }

  if (variant === 'warning') {
    buttonContainer = {
      backgroundColor: theme.error
    }

    titleStyle = {
      color: '#fff'
    }
  }

  if (variant === 'outline') {
    buttonContainer = {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.buttonBackground
    }

    titleStyle = {
      color: theme.secondaryText
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        buttonContainer
      ]}
      {...rest}
    >
      {leftIcon && leftIcon}

      <Text
        style={[
          styles.title,
          titleStyle
        ]}
      >
        {title}
      </Text>

      {rightIcon && rightIcon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: spacing.s
  },
  title: {
    fontSize: 18,
    fontFamily: 'Quicksand-SemiBold',
  }
});
