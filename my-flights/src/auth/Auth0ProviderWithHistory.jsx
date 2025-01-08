// // src/auth/Auth0ProviderWithHistory.js
// import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
// import { useNavigate } from 'react-router-dom';

// const Auth0ProviderWithHistory = ({ children }) => {
//   const domain = import.meta.env.VITE_AUTH0_DOMAIN;
//   const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
//   const navigate = useNavigate();

//   const onRedirectCallback = () => {
//     navigate('/testi'); // Redirect to testimonial page on successful login
//   };

//   return (
//     <Auth0Provider
//       domain={domain}
//       clientId={clientId}
//       authorizationParams={{
//         redirect_uri: window.location.origin,
//       }}
//       onRedirectCallback={onRedirectCallback}
//     >
//       {children}
//     </Auth0Provider>
//   );
// };

// export default Auth0ProviderWithHistory;

import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const navigate = useNavigate();

  // const onRedirectCallback = () => {
  //   navigate('/testi'); // Redirect to testimonial page on successful login
  // };

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || '/testi');
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/testi`,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
