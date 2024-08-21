import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { ListTasks } from "../screens/ListTasks";
import { List } from "../components/ListItem";

export type StackParamList = {
  Home: undefined,
  ListTasks: List,
}

const Stack = createNativeStackNavigator<StackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ListTasks"
        component={ListTasks}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}