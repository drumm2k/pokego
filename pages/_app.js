import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import NProgress from 'nprogress'; // nprogress module
import PropTypes from 'prop-types';
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
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
