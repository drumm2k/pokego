import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import Meta from './Meta';
import Header from './Header';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  *,
  *::before,
  *::after {box-sizing:border-box;}
  a {text-decoration:none; color:inherit; cursor:pointer;}
  button {background-color:transparent; color:inherit; border-width:0; padding:0; cursor:pointer;}
  figure {margin:0;}
  input::-moz-focus-inner {border:0; padding:0; margin:0;}
  ul, ol, dd {margin:0; padding:0; list-style:none;}
  h1, h2, h3, h4, h5, h6 {margin:0; font-size:inherit; font-weight:inherit;}
  p {margin:0;}
  cite {font-style:normal;}
  fieldset {border-width:0; padding:0; margin:0;}
  img{max-width:100%;}

  html {
   font-size: 10px;
  }

  body {
   font-family: 'Noah', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
   font-size: 1.8rem;
   font-weight: 400;
   line-height: 1.4;
   color: #222;
  }

  @font-face {
    font-family: 'Noah';
    font-style: normal;
    font-weight: 400;
    src: local('Noah Regular'), local('Noah Regular'),
        url('/static/fonts/Noah-Regular.woff2') format('woff2'),
        url('/static/fonts/Noah-Regular.woff') format('woff');
  }

  @font-face {
    font-family: 'Noah';
    font-style: normal;
    font-weight: 700;
    src: local('Noah Bold'), local('Noah Bold'),
        url('/static/fonts/Noah-Bold.woff2') format('woff2'),
        url('/static/fonts/Noah-Bold.woff') format('woff');
  }

  ::selection {
    background-color: #222;
    color: #fff;
  }

  :focus {
    outline-color: #222;
  }

  h1 {
    font-size: 4.8rem;
    font-weight: 700;
    line-height: 1.125;
  }

  h2 {
    font-size: 3.6rem;
    font-weight: 700;
    line-height: 1.25;
  }

  h3 {
    font-size: 2.8rem;
    font-weight: 700;
    line-height: 1.25;
  }

  h4 {
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1.22;
  }
`;

const Wrapper = styled.div`
  padding: 0 2rem;
  margin: 0 auto;

  @media screen and (min-device-width: 768px) {
    max-width: 720px;
  }
`;

class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        <GlobalStyle />
        <Wrapper>
          <Header />
          {this.props.children}
        </Wrapper>
      </div>
    );
  }
}

export default Page;
