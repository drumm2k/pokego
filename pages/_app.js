import { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { ThemeProvider } from 'styled-components';
import NProgress from 'nprogress';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';

import Page from '../components/Page';
import AuthContext from '../context/auth';

import theme from '../config/theme';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }) {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [roles, setRoles] = useState(null);

  const [token, setToken] = useState(null);

  const login = (
    tokenData,
    userIdData,
    userNameData,
    rolesData,
    tokenExpirationData
  ) => {
    setUserId(userIdData);
    setUserName(userNameData);
    setRoles(rolesData);
    setToken(tokenData);
  };

  const logout = () => {
    setUserId(null);
    setUserName(null);
    setRoles(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider
          value={{
            userId,
            userName,
            roles,
            token,
            login,
            logout,
          }}
        >
          <Page>
            <Component {...pageProps} />
          </Page>
        </AuthContext.Provider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
