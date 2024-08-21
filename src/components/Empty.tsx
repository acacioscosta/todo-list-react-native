import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";

interface EmptyProps {
  emptyMessage: string;
}

export const Empty = ({ emptyMessage }: EmptyProps) => {
  const { theme } = useContext(ThemeContext)

  return (
    <View style={styles.emptyContent}>
      <Text
        style={[
          styles.text,
          {
            color: theme.secondaryText
          }
        ]}
      >
        {emptyMessage}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  emptyContent: {
    alignItems: 'center',
    marginTop: 30
  },
  text: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 18
  }
})