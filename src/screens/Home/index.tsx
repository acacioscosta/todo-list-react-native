import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { StatusBar, StyleSheet, Text, View } from "react-native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StackParamList } from "../../routes"
import { Screen } from "../../components/Screen"
import { spacing } from "../../theme"
import { Input } from "../../components/Input"
import Feather from "react-native-vector-icons/Feather"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { CustomFlatList } from "../../components/FlatList"
import { List, ListItem } from "../../components/ListItem"
import { useCallback, useContext, useEffect, useState } from "react"
import { ActionBottom } from "../../components/ActionBottom"
import { Button } from "../../components/Button"
import FloatTabBar from "../../components/FloatTabBar"
import { ThemeContext } from "../../contexts/ThemeContext"
import { storageService } from "../../../services/storageService"

interface ListToRemove {
  id: string
  name: string
}

export const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()
  const { theme, isDark } = useContext(ThemeContext)

  const [searchQuery, setSearchQuery] = useState('')
  const [lists, setLists] = useState<List[]>([])
  const [filteredLists, setFilteredLists] = useState<List[]>([]);
  const [actionBottomIsVisible, setActionBottomIsVisible] = useState(false)
  const [showActionBottomConfirmRemove, setShowActionBottomConfirmRemove] = useState(false)
  const [newListName, setNewListName] = useState('')
  const [listToRemove, setListToRemove] = useState<ListToRemove>()

  useFocusEffect(
    useCallback(() => {
      loadLists()

      return () => {}
    }, [])
  )

  useEffect(() => {
    filterLists();
  }, [searchQuery, lists]);

  const loadLists = async () => {
    try {
      const keys = await storageService.getAllKeys()

      if (!keys) {
        setLists([])

        return
      }

      const allLists: List[] = []

      for (const key of keys) {
        const list = await storageService.getItem<List>(key)

        list && allLists.push(list)
      }

      setLists(allLists)
    } catch (error) {
      console.log('[ERROR-GET-LISTS] => ', error)
    }
  }

  const filterLists = () => {
    if (!searchQuery) {
      setFilteredLists(lists);
      return;
    }

    const filtered = lists.filter(list => 
      list.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredLists(filtered);
  }

  const handleAddList = async () => {
    try {
      const date = new Date().getTime()

      const id = String(date)

      const newList = {
        id,
        name: newListName,
        tasks: [],
      }

      await storageService.setItem(id, newList)
      
      setActionBottomIsVisible(false)

      setNewListName('')
  
      navigation.navigate('ListTasks', newList)
    } catch (error) {
      console.log('[ERROR-HANDLE-ADD-LIST] => ', error)
    }
  }

  const removeList = async () => {
    try {
      if (!listToRemove?.id) {
        return
      }

      await storageService.removeItem(listToRemove.id)

      await loadLists()

      setShowActionBottomConfirmRemove(false)
    } catch (error) {
      console.log('[ERROR-REMOVE-LIST] => ', error)
    }
  }

  const confirmRemove = (id: string, name: string) => {
    setListToRemove({
      id,
      name
    })

    setShowActionBottomConfirmRemove(true)
  }

  return (
    <Screen>
      <StatusBar
        backgroundColor={theme.background}
        barStyle={isDark ? 'light-content' : 'dark-content' }
      />
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
        renderItem={({ item }) => <ListItem {...item} onLongPress={confirmRemove} />}
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
            returnKeyType="done"
            onSubmitEditing={handleAddList}
          />
        </View>

        <View style={{ marginHorizontal: spacing.s, marginVertical: spacing.m }}>
          <Button
            title="Adicionar"
            onPress={handleAddList}
          />
        </View>
      </ActionBottom>

      <ActionBottom
        isVisible={showActionBottomConfirmRemove}
        onClose={() => setShowActionBottomConfirmRemove(false)}
        title="Atenção!"
      >
        <View style={{ margin: spacing.m }}>
          <Text
            style={[
              styles.textConfirm,
              { color: theme.secondaryText }
            ]}
          >
            Tem certeza que deseja remover a lista <Text style={styles.confirmListName}>{listToRemove?.name}</Text>?</Text>
        </View>

        <View style={styles.btnContent}>
          <Button
            title="Sim"
            onPress={removeList}
            variant="warning"
          />

          <Button
            title="Não"
            onPress={() => setShowActionBottomConfirmRemove(false)}
            variant="outline"
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
  },
  textConfirm: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 18,
    textAlign: 'center',
  },
  confirmListName: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 18
  },
  btnContent: {
    marginHorizontal: spacing.s,
    marginVertical: spacing.m,
    rowGap: spacing.m
  }
})