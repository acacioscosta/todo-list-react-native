import React, { ReactNode } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing } from '../theme';

interface FABProps {
  onPress: () => void;
  icon?: ReactNode;
}

export const FAB = ({ onPress, icon }: FABProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon
        ? icon
        : (
            <MaterialCommunityIcons
              name={'plus'}
              size={24}
              color={colors.primary}
            />
          )
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: spacing.l,
    right: spacing.l,
    backgroundColor: colors.cardBackground,
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    // shadowColor: colors.shadow, // sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  }
});

