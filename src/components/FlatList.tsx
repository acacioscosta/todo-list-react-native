import { FlatList, FlatListProps, StyleSheet, View } from "react-native"
import { Empty } from "./Empty";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

interface CustomFlatListProps<T> extends FlatListProps<T> {
  emptyMessage?: string;
}

export const CustomFlatList = <T,>({ emptyMessage = 'Nenhuma lista encontrada', ...rest }: CustomFlatListProps<T>) => {
  const { theme } = useContext(ThemeContext)

  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={[styles.divider, { backgroundColor: theme.borderColor }]} />}
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<Empty emptyMessage={emptyMessage} />}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 1
  }
})