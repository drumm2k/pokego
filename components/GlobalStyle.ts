import { createGlobalStyle } from 'styled-components';
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
  img{max-width:100%;}

  html {
    font-size: 10px;
  }

  body {
    font-family: 'Noah', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 1.4;
  }

  @font-face {
    font-family: 'Noah';
    font-style: normal;
    font-weight: 400;
    src: local('Noah Regular'), local('Noah Regular'),
        url('/fonts/Noah-Regular.woff2') format('woff2'),
        url('/fonts/Noah-Regular.woff') format('woff');
  }

  @font-face {
    font-family: 'Noah';
    font-style: normal;
    font-weight: 700;
    src: local('Noah Bold'), local('Noah Bold'),
        url('/fonts/Noah-Bold.woff2') format('woff2'),
        url('/fonts/Noah-Bold.woff') format('woff');
  }

  ::selection {
    background-color: ${(p) => p.theme.color.gray700};
    color: ${(p) => p.theme.color.white};
  }

  h1, h2, h3, h4 {
    font-weight: 700;
  }

  h1 {
    font-size: 2.8rem;
    line-height: 3.6rem;
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 2.4rem;
    line-height: 3.2rem;
  }

  h3 {
    font-size: 2.0rem;
    line-height: 2.8rem;
  }

  h4 {
    font-size: 1.8rem;
    line-height: 2.6rem;
  }

  a {
    color: ${(p) => p.theme.color.link};
    transition: color 0.25s;

    &:hover {
      color: ${(p) => p.theme.color.black};
    }
  }

  .leaflet-container {
    height: 450px;
    width: 100%;
    box-shadow: ${(p) => p.theme.lighting.shadow200};
  }

  #nprogress .bar {
  background: ${(p) => p.theme.color.gray600};
  height: 3px;
}

  #nprogress .peg {
    box-shadow: 0 0 10px #000, 0 0 5px #000;
  }
`;

export default GlobalStyle;
