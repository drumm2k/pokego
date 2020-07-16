import Router from 'next/router';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/client';
import NProgress from 'nprogress';
import theme from '../config/theme';
import { useApollo } from '../lib/apolloClient';
import 'nprogress/nprogress.css'; // styles of nprogress
import Page from '../components/Page';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ThemeProvider>
    </ApolloProvider>
  );
}

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
