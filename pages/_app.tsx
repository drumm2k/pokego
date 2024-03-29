import { ApolloProvider } from '@apollo/client';
import Page from 'components/Page';
import theme from 'config/theme';
import AuthContext from 'context/auth';
import { setAccessToken } from 'lib/accessToken';
import { useApollo } from 'lib/apolloClient';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const login = (userData: any) => {
    setUser(userData);
  };

  const logout = async () => {
    setUser(null);
    setAccessToken('');
  };

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_REFRESH_TOKEN, {
      method: 'POST',
      credentials: 'include',
    }).then(async (res) => {
      const { accessToken } = await res.json();

      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider
          value={{
            user,
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
