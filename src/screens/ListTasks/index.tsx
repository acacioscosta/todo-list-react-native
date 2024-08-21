import { RouteProp, useRoute } from "@react-navigation/native"
import { Screen } from "../../components/Screen"
import { List } from "../../components/ListItem"
import Header from "../../components/Header"
import { Input } from "../../components/Input"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../../contexts/ThemeContext"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { spacing } from "../../theme"
import { CustomFlatList } from "../../components/FlatList"
import { Task, TaskItem } from "../../components/TaskItem"
import { storageService } from "../../../services/storageService"
import { ActionBottom } from "../../components/ActionBottom"
import { Button } from "../../components/Button"
import { Divider } from "../../components/Divider"

type RouteListTasksParams = {
  list: List
}

type ListTasksRouteProps = RouteProp<RouteListTasksParams, 'list'>

interface TaskToRemove {
  id: string
  description: string
}

export const ListTasks = () => {
  const route = useRoute<ListTasksRouteProps>()
  const { id, name, tasks } = route.params
  const { theme } = useContext(ThemeContext)

  const [task, setTask] = useState('')
  const [list, setList] = useState<Task[]>([])
  const [taskToRemove, setTaskToRemove] = useState<TaskToRemove>()
  const [actionBottomIsVisible, setActionBottomIsVisible] = useState(false)

  useEffect(() => {
    setList(tasks)
  }, [id])

  const amountFinished = list.reduce((acc, current) => {
    return current.finished
      ? acc += 1
      : acc
  }, 0)

  const changeListTask = async (newListTask: Task[]) => {
    await storageService.setItem(id, {
      id,
      name,
      tasks: newListTask,
    })
  }

  const addTask = async () => {
    if (!task) {
      return
    }

    const newTask: Task = {
      id: String(new Date().getTime()),
      description: task,
      finished: false,
    }

    const newListTask = [...list, newTask]

    setList(newListTask)

    setTask('')

    await changeListTask(newListTask)
  }

  const onClickItem = async (id: string) => {
    const newTasks = list.map(task => {
      if (task.id !== id) {
        return task
      }

      return {
        ...task,
        finished: !task.finished
      }
    })

    setList(newTasks)

    await changeListTask(newTasks)
  }

  const removeTask = async () => {
    const newTasks = list.filter(task => task.id !== taskToRemove?.id)

    setList(newTasks)

    setActionBottomIsVisible(false)

    await changeListTask(newTasks)
  }

  const onLongPress = (id: string, description: string) => {
    setTaskToRemove({
      id,
      description
    })

    setActionBottomIsVisible(true)
  }

  return (
    <Screen>
      <View style={{ paddingHorizontal: spacing.s }}>
        <Header
          title={route.params.name}
          canGoBack
          right={
            <Text
              style={[
                styles.amount,
                { color: theme.secondaryText }
              ]}
            >
              {amountFinished} / {list.length}
            </Text>}
        />
      </View>

      <View style={{ paddingHorizontal: spacing.s }}>
        <Input
          placeholder="Ex.: Arroz 1kg"
          value={task}
          onChangeText={setTask}
          rightIcon={(
            <TouchableOpacity
              onPress={addTask}
              activeOpacity={.7}
              disabled={!task}
            >
              <MaterialCommunityIcons
                name="plus-circle"
                size={28}
                color={theme.secondaryText}
              />
            </TouchableOpacity>
          )}
          returnKeyType="send"
          onSubmitEditing={addTask}
          autoCapitalize="sentences"
        />
      </View>

      <CustomFlatList
        data={list}
        renderItem={({ item }) => (
          <TaskItem
            {...item}
            onLongPress={onLongPress}
            onPress={onClickItem}
          />
        )}
        emptyMessage="Nenhuma atividade cadastrada"
        style={styles.flatList}
      />

      <ActionBottom
        isVisible={actionBottomIsVisible}
        onClose={() => setActionBottomIsVisible(false)}
        title="Atenção!"
      >
        <View style={{ margin: spacing.m }}>
          <Text
            style={[
              styles.textConfirm,
              { color: theme.secondaryText }
            ]}
          >
            Tem certeza que deseja remover a atividade <Text style={styles.confirmTaskName}>{taskToRemove?.description}</Text>?</Text>
        </View>

        <View style={styles.btnContent}>
          <Button
            title="Sim"
            onPress={removeTask}
            variant="warning"
          />

          <Button
            title="Não"
            onPress={() => setActionBottomIsVisible(false)}
            variant="outline"
          />
        </View>
      </ActionBottom>
    </Screen>
  )
}

const styles = StyleSheet.create({
  amount: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 14
  },
  flatList: {
    marginHorizontal: spacing.s,
    marginTop: spacing.m
  },
  actionBottomTitle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 22,
    marginBottom: spacing.s,
  },
  textConfirm: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 18,
    textAlign: 'center',
  },
  confirmTaskName: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 18
  },
  btnContent: {
    marginHorizontal: spacing.s,
    marginVertical: spacing.m,
    rowGap: spacing.m
  }
})