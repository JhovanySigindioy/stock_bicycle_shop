import './App.css'
import { RouterMain } from './router/RouterMain';
import { AppTheme } from './theme';

export const App = () => {
  return (
    <AppTheme>
      <RouterMain />
    </AppTheme>
  );
}
