import { ReactNode, useContext } from 'react';
import { StyleSheet, TouchableOpacityProps, TouchableOpacity, Text } from 'react-native';
import { spacing } from '../../theme';
import { ThemeContext } from '../../contexts/ThemeContext';
import { createVariants } from './variants';

interface ButtonProps extends TouchableOpacityProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  title: string;
  variant?: 'primary' | 'outline' | 'warning' | 'warningOutline'
  style?: TouchableOpacityProps['style']
  disabled?: boolean;
}

export const Button = ({
  title,
  leftIcon,
  rightIcon,
  variant = 'primary',
  style,
  disabled = false,
  ...rest
}: ButtonProps) => {
  const { theme } = useContext(ThemeContext);
  const selectedVariant = createVariants(theme)[variant]

  const buttonStyle = disabled
    ? selectedVariant.disabled
    : selectedVariant.enabled

  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        buttonStyle.button,
        style
      ]}
      {...rest}
      disabled={disabled}
    >
      {leftIcon && leftIcon}

      <Text
        style={[
          styles.title,
          buttonStyle.title
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
    height: 50,
    borderRadius: spacing.s
  },
  title: {
    fontSize: 18,
    fontFamily: 'Quicksand-SemiBold',
  }
});
