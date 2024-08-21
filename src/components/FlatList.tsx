import { FlatList, FlatListProps } from "react-native"
import { Empty } from "./Empty";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Divider } from "./Divider";

interface CustomFlatListProps<T> extends FlatListProps<T> {
  emptyMessage?: string;
}

export const CustomFlatList = <T,>({ emptyMessage = 'Nenhuma lista encontrada', ...rest }: CustomFlatListProps<T>) => {
  const { theme } = useContext(ThemeContext)

  return (
    <FlatList
      ItemSeparatorComponent={() => <Divider />}
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<Empty emptyMessage={emptyMessage} />}
      {...rest}
    />
  )
}