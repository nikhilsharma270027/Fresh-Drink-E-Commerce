import React from 'react'
import { Auth0Provider } from '@auth0/auth0-react';
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!)
.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-e7kwz32ylcdzonq1.us.auth0.com"
    clientId="TkhIZKK5OF9LdnfHOA7KqNupSofS4WMq"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "apple",
      scope: "openid profile email",
    }}
  >
    <App />
    </Auth0Provider>
  </React.StrictMode>,
)
