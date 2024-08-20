import { useNavigation } from "@react-navigation/native"
import { Text, TouchableOpacity } from "react-native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StackParamList } from "../../routes"
import { Screen } from "../../components/Screen"

export const ListTasks = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()

  return (
    <Screen>
      <Text>Lista de Tasks</Text>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Home</Text>
      </TouchableOpacity>
    </Screen>
  )
}