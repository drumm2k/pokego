import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Meta from './Meta';
import { normalize } from 'styled-normalize';

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
`;

const Wrapper = styled.div`
  padding: 2rem;
  margin: 0 auto;
`;

class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        <GlobalStyle />
        <Wrapper>{this.props.children}</Wrapper>
      </div>
    );
  }
}

export default Page;
