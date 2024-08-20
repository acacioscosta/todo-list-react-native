import { ReactNode, useContext } from 'react';
import { StyleSheet, TextInput, TextInputProps, View, Text } from 'react-native';
import { spacing } from '../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../contexts/ThemeContext';

interface InputProps extends TextInputProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  label?: string;
}

export const Input = ({ label, leftIcon, rightIcon, ...rest }: InputProps) => {
  const { theme } = useContext(ThemeContext)

  return (
    <View>
      {label && (
        <Text
          style={[
            styles.label,
            { color: theme.primaryText }
          ]}
        >
          {label}
        </Text>)
      }

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: theme.borderColor,
              backgroundColor: theme.cardBackground,
              color: theme.secondaryText
            }
          ]}
          placeholderTextColor={theme.secondaryText}
          underlineColorAndroid='transparent'
          {...rest}
        />

        <View style={styles.iconLeft}>
          {leftIcon
            ? leftIcon
            : (
                <MaterialCommunityIcons
                  name="text"
                  size={26}
                  color={theme.secondaryText}
                />
              )
          }
        </View>

        {rightIcon && (
          <View style={styles.iconRight}>
            {rightIcon}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.m
  },
  label: {
    fontSize: 16,
    marginBottom: spacing.s,
    fontFamily: 'Quicksand-Bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    paddingLeft: spacing.xl + 5,
    borderRadius: spacing.s,
    fontSize: 18,
    fontFamily: 'Quicksand-Medium',
  },
  iconLeft: {
    position: 'absolute',
    left: 10,
    top: 12,
  },
  iconRight: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
});
