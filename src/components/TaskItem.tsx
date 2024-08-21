import { useContext } from "react";
import { Pressable, StyleSheet, Text } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from "../contexts/ThemeContext";
import { spacing } from "../theme";

export interface Task {
  id: string
  description: string
  finished: boolean
}

interface TaskItemProps extends Task {
  onLongPress: (id: string, description: string) => void
  onPress: (id: string) => void
}

export const TaskItem = ({ id, description, finished, onLongPress, onPress }: TaskItemProps) => {
  const { theme } = useContext(ThemeContext)

  return (
    <Pressable
      style={styles.container}
      onLongPress={() => onLongPress(id, description)}
      onPress={() => onPress(id)}
    >
      <Text
        style={[
          styles.taskName,
          {
            textDecorationLine: finished ? 'line-through' : 'none',
            color: theme.secondaryText
          }
        ]}
      >
        {description}
      </Text>

      {finished
        ? (
            <MaterialCommunityIcons
              name="check-circle"
              size={22}
              color={theme.secondaryText}
            />
          )
        : (
            <MaterialCommunityIcons
              name="checkbox-blank-circle-outline"
              size={22}
              color={theme.secondaryText}
            />
          )
      }
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: spacing.s,
    paddingVertical: 12,
    alignContent: 'center',
    alignItems: 'center'
  },
  taskName: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 16
  }
})