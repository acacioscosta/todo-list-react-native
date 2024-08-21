import { useContext } from "react"
import { StyleSheet, View } from "react-native"
import { ThemeContext } from "../contexts/ThemeContext"

export const Divider = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <View
      style={[
        styles.divider,
        { backgroundColor: theme.borderColor }
      ]}
    />
  )
}

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 1
  }
})