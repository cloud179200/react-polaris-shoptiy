import '@shopify/polaris/build/esm/styles.css';
import { AppProvider, Page } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import Form from './Form';

function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <Page fullWidth>
        <Form />
      </Page>
    </AppProvider>
  );
}

export default App;
