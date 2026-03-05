/* eslint-disable */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import store from './slices/index.js';
import init from './init.js';

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: import.meta.env.MODE,
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const run = async () => {
  const i18n = await init();

  const root = createRoot(document.getElementById('root'));
  root.render(
    <StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary fallbackUI={() => <div>Упс! Что-то пошло не так.</div>}>
          <ReduxProvider store={store}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </ReduxProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </StrictMode>,
  );
};

run();
