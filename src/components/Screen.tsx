import { ReactNode, useContext } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { spacing } from '../theme'
import { ThemeContext } from '../contexts/ThemeContext'

interface ScreenProps {
  center?: boolean
  children?: ReactNode
}

export const Screen = ({ center, children }: ScreenProps) => {
  const { theme } = useContext(ThemeContext)

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.background },
        center && styles.center
      ]}>
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.s
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})