import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { ListTasks } from "../screens/ListTasks";

export type StackParamList = {
  Home: undefined,
  ListTasks: undefined,
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