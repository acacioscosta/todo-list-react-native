import { Pressable, StyleSheet, Text, View } from "react-native"
import Feather from "react-native-vector-icons/Feather"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StackParamList } from "../routes"
import { Avatar } from "./Avatar"
import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

export type List = {
  id: string
  name: string
  tasks: Task[]
}

export type Task = {
  id: string
  description: string
  finished: boolean
}

interface ListItemProps extends List {
  onLongPress: (id: string, name: string) => void
}

export const ListItem = ({ id, name, tasks, onLongPress }: ListItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()
  const { theme } = useContext(ThemeContext)

  const amountFinished = tasks.reduce((acc, current) => {
    return current.finished
      ? acc += 1
      : acc
  }, 0)

  const onPress = () => navigation.navigate('ListTasks', {
    id,
    name,
    tasks,
  })

  return (
    <Pressable
      style={styles.container}
      key={id}
      onLongPress={() => onLongPress(id, name)}
      onPress={onPress}
    >
      <View style={styles.contentLeft}>
        <View>
          <Avatar name={name}/>
        </View>

        <View>
          <Text
            style={[
              styles.listName,
              { color: theme.secondaryText }
            ]}
          >
            {name}
          </Text>

          <Text
            style={[
              styles.amount,
              { color: theme.secondaryText }
            ]}
          >
            {amountFinished} / {tasks.length}
          </Text>
        </View>
      </View>

      <View>
        <Feather
          name="chevron-right"
          size={24}
          color={theme.secondaryText}
        />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 4,
    paddingVertical: 12,
    alignContent: 'center',
    alignItems: 'center'
  },
  contentLeft: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center'
  },
  listName: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 18
  },
  amount: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 14,
  }
})