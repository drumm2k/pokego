// import original module declarations
import 'styled-components';

// // and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    font: {
      weight: {
        normal: string;
        bold: string;
      };
      size: {
        xss: string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
    };

    color: {
      black: string;
      white: string;
      accent: string;
      warning: string;
      success: string;
      link: string;
      orange: string;

      gray50: string;
      gray100: string;
      gray200: string;
      gray300: string;
      gray400: string;
      gray500: string;
      gray600: string;
      gray700: string;
      gray800: string;
      gray900: string;
    };

    border: {
      border100: string;
      border200: string;
      border300: string;
      border400: string;
      border500: string;
      border600: string;
      border700: string;
      border800: string;
      radius100: string;
      radius200: string;
      radius300: string;
      radius400: string;
      radius500: string;
    };

    breakpoint: {
      small: string;
      medium: string;
      large: string;
    };

    lighting: {
      shadow100: string;
      shadow200: string;
      shadow300: string;
      shadow400: string;
      light: string;
      hard: string;
    };

    input: {
      border: string;
      focus: string;
      invalid: string;
    };

    spacing: {
      s0: string;
      s1: string;
      s2: string;
      s3: string;
      s4: string;
      s5: string;
      s6: string;
      s8: string;
      s10: string;
      s12: string;
      s16: string;
      s20: string;
    };

    modal: {
      overlay: string;
    };
  }
}
