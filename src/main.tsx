import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from './lib/store.js';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { Auth0Provider } from '@auth0/auth0-react';
// import './inpm ndex.css'

const queryClient = new QueryClient({
  // queryCache: new QueryCache({
  //   onError: (error, query)=> {
  //     if (query?.meta?.errorMessage) {
  //       console.log(query.meta.errorMessage);
  //     }
  //   }
  // }),
  // mutationCache: new MutationCache({
  //   onError: (error)=> {
  //     console.log(error);
  //   }
  // }),
  // defaultOptions: {
  //   queries: {
  //     staleTime: 60 * 1000,
  //   },
  // },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Auth0Provider
      // SPA Auth0 - DEV
      //   domain='dev-1gk5wccsooddgtgs.us.auth0.com'
      //   clientId='qXlajgBB0iJJEonkNU2FVRiniRIGpVsu'

      // SPA Auth0 - PROD
      domain="dev-1gk5wccsooddgtgs.us.auth0.com"
      clientId="6icVcsvKre3GJMX4NRcEwDAQayqyNtsD"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    > */}
      <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
        <App />
      </QueryClientProvider>
      </Provider>
    {/* </Auth0Provider> */}
  </React.StrictMode>
);
