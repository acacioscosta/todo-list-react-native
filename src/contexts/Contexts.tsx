import { ReactNode } from 'react';
import ThemeProvider from './ThemeContext'

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};

export default AppProviders;
