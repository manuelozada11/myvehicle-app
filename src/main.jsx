import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

// Sentry.init({
//   dsn: "https://705eb52d9ebe433d9844ff2594e9e08e@o1427580.ingest.sentry.io/6777019",
//   integrations: [new BrowserTracing()],
//   tracesSampler: 1.0
// });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
