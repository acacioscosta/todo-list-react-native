import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { spacing } from '../theme';
import { ReactNode, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

interface Props {
  children: ReactNode
  isVisible: boolean
  onClose: () => void
}

export const ActionBottom = ({ children, onClose, ...rest }: Props) => {
  const { theme } = useContext(ThemeContext)

  return (
      <Modal
        {...rest}
        style={styles.modal}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        swipeDirection="down"
        onSwipeComplete={onClose}
      >
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.background }
          ]}
        >
          <View
            style={[
              styles.dragIndicator,
              { backgroundColor: theme.borderColor }
            ]}
          />

          {children}
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    padding: spacing.s,
    borderTopLeftRadius: spacing.s,
    borderTopRightRadius: spacing.s,
  },
  dragIndicator: {
    width: spacing.xl,
    height: 5,
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: spacing.s,
  },
})
