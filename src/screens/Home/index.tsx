import { useNavigation } from "@react-navigation/native"
import { StyleSheet, View } from "react-native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StackParamList } from "../../routes"
import { Screen } from "../../components/Screen"
import { spacing } from "../../theme"
import { Input } from "../../components/Input"
import Feather from "react-native-vector-icons/Feather"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { CustomFlatList } from "../../components/FlatList"
import { List, ListItem } from "../../components/ListItem"
import { useContext, useEffect, useState } from "react"
import { ActionBottom } from "../../components/ActionBottom"
import { Button } from "../../components/Button"
import FloatTabBar from "../../components/FloatTabBar"
import { ThemeContext } from "../../contexts/ThemeContext"

const tests = [
  { id: '1', name: 'FEIRA SETEMBRO E OUTUBRO', tasks: [] },
  { id: '2', name: 'LIST 2', tasks: [] },
  { id: '3', name: 'LIST 3', tasks: [] },
  { id: '4', name: 'LIST 4', tasks: [] },
  { id: '5', name: 'LIST 5', tasks: [] },
  { id: '6', name: 'LIST 6', tasks: [] },
  { id: '7', name: 'LIST 7', tasks: [] },
  { id: '8', name: 'LIST 8', tasks: [] },
  { id: '9', name: 'LIST 9', tasks: [] },
  { id: '10', name: 'LIST 10', tasks: [] },
  { id: '11', name: 'LIST 11', tasks: [] },
  { id: '12', name: 'LIST 12', tasks: [] },
  { id: '13', name: 'LIST 13', tasks: [] },
  { id: '14', name: 'LIST 14', tasks: [] },
]

export const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()
  const { theme } = useContext(ThemeContext)

  const [searchQuery, setSearchQuery] = useState('')
  const [lists, setLists] = useState<List[]>(tests)
  const [filteredLists, setFilteredLists] = useState<List[]>([]);
  const [actionBottomIsVisible, setActionBottomIsVisible] = useState(false)
  const [newListName, setNewListName] = useState('')

  useEffect(() => {
    filterLists();
  }, [searchQuery, lists]);

  const filterLists = () => {
    if (!searchQuery) {
      setFilteredLists(lists);
      return;
    }

    const filtered = lists.filter(list => 
      list.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredLists(filtered);
  };

  return (
    <Screen>
      <View style={styles.viewSearch}>
        <Input
          placeholder="Buscar ..."
          leftIcon={<Feather name="search" size={26} color={theme.secondaryText} />}
          underlineColorAndroid={'transparent'}
          onChangeText={setSearchQuery}
          autoCapitalize="characters"
        />
      </View>

      <CustomFlatList
        data={filteredLists}
        renderItem={({ item }) => <ListItem {...item} onLongPress={() => {}} />}
      />

      <FloatTabBar
        onAddPress={() => setActionBottomIsVisible(true)}
      />

      <ActionBottom
        isVisible={actionBottomIsVisible}
        onClose={() => setActionBottomIsVisible(false)}
      >
        <View style={{ margin: spacing.s }}>
          <Input
            autoCapitalize="sentences"
            label="Nome da lista"
            placeholder="Ex.: Aniversário da Maria"
            leftIcon={<MaterialCommunityIcons name="clipboard-list" size={26} color={theme.secondaryText} />}
            onChangeText={setNewListName}
            value={newListName}
            autoFocus
          />
        </View>

        <View style={{ marginHorizontal: spacing.s, marginVertical: spacing.m }}>
          <Button
            title="Adicionar"
          />
        </View>
      </ActionBottom>
    </Screen>
  )
}

const styles = StyleSheet.create({
  viewSearch: {
    marginTop: spacing.s,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.s,
  },
  iconRight: {
    position: 'absolute',
    right: 30,
    top: 12,
  }
})