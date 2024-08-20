import { StyleSheet, Text, View } from "react-native";

interface EmptyProps {
  emptyMessage: string;
}

export const Empty = ({ emptyMessage }: EmptyProps) => {
  return (
    <View style={styles.emptyContent}>
      <Text style={{ fontFamily: 'Quicksand-SemiBold', fontSize: 18 }}>{emptyMessage}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  emptyContent: {
    alignItems: 'center',
    marginTop: 30
  }
})