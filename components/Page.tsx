import styled from 'styled-components';
import Footer from './Footer';
import GlobalStyle from './GlobalStyle';
import Header from './Header';
import Meta from './Meta';

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Meta />
      <GlobalStyle />
      <Wrapper>
        <Header />
        <main>{children}</main>
        <Footer />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  padding: 0 ${(p) => p.theme.spacing.s6};
  margin: 0 auto;

  @media screen and (min-device-width: 768px) {
    max-width: 720px;
  }
`;
