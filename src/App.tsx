import '@shopify/polaris/build/esm/styles.css';
import { AppProvider} from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import Component from './Component';

function App() {
  return (
    <AppProvider i18n={enTranslations}>
        <Component />
    </AppProvider>
  );
}

export default App;
