import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/routes';
import { initializeStorage } from './services/storageService';
import { mmkvStorage } from './services/mmkvStorage';
import { asyncStorage } from './services/asyncStorage';
import AppProviders from './src/contexts/Contexts';

initializeStorage(mmkvStorage)

export default function App() {
  return (
    <AppProviders>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AppProviders>
  );
}