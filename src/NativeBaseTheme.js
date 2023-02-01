import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';

const theme = extendTheme({

colors: {
        // Add new color
        primary: {
          50: '#FFFFFF',
          100: '#e0f2fe',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#000000',
        },
        // Redefinig only one shade, rest of the color will remain same.
        amber: {
          400: '#d97706',
        },
      },

  fontConfig: {
    Roboto: {
      100: {
        normal: 'Roboto-Light',
        italic: 'Roboto-LightItalic',
      },
      200: {
        normal: 'Roboto-Light',
        italic: 'Roboto-LightItalic',
      },
      300: {
        normal: 'Roboto-Light',
        italic: 'Roboto-LightItalic',
      },
      400: {
        normal: 'Roboto-Regular',
        italic: 'Roboto-Italic',
      },
      500: {
        normal: 'Roboto-Medium',
      },
      600: {
        normal: 'Roboto-Medium',
        italic: 'Roboto-MediumItalic',
      },
    },

    Comfortaa: {
          100: {
            normal: 'Comfortaa-Light',
          },
          200: {
            normal: 'Comfortaa-Light',
          },
          300: {
            normal: 'Comfortaa-Light',
          },
          400: {
            normal: 'Comfortaa-Regular',
          },
          500: {
            normal: 'Comfortaa-Medium',
          },
          600: {
            normal: 'Comfortaa-Medium',
          },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'Comfortaa',
    body: 'Roboto',
    mono: 'Roboto',
  },
});