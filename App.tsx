import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/routes';
import { initializeStorage } from './services/storageService';
import { mmkvStorage } from './services/mmkvStorage';
import AppProviders from './src/contexts/Contexts';
import BootSplash from "react-native-bootsplash";

initializeStorage(mmkvStorage)

export default function App() {
  return (
    <AppProviders>
      <NavigationContainer
        onReady={() => BootSplash.hide({ fade: true })}
      >
        <StackNavigator />
      </NavigationContainer>
    </AppProviders>
  );
}