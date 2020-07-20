import { useState } from 'react';
import Router from 'next/router';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/client';
import NProgress from 'nprogress';
import theme from '../config/theme';
import AuthContext from '../context/auth';
import { useApollo } from '../lib/apolloClient';

import Page from '../components/Page';
import 'nprogress/nprogress.css'; // styles of nprogress

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }) {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  const [token, setToken] = useState(null);

  const login = (tokenData, userIdData, userNameData, tokenExpirationData) => {
    setUserId(userIdData);
    setUserName(userNameData);
    setToken(tokenData);
  };

  const logout = () => {
    setUserId(null);
    setUserName(null);
    setToken(null);
  };

  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider
          value={{
            userId,
            userName,
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
