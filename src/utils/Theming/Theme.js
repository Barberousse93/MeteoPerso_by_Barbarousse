import { createTheme } from '@mui/material'

const LOCAL_STORAGE_KEY = 'isDark'

// const baseTheme = createTheme({
//   typography: {
//     fontFamily: "'Work Sans', sans-serif",
//     fontSize: 14,
//     fontFamilySecondary: "'Roboto Condensed', sans-serif"
//   }
// })

const DARK_THEME = createTheme({
  //   ...baseTheme,
  //   palette: {
  //     type: 'dark'
  //         ,
  //     primary: {
  //       main: '#5c85ff'
  //     },
  //     secondary: {
  //       main: '#000000'
  //     },
  //     background: {
  //       default: '#353030'
  //     },
  //     text: {
  //       primary: '#f7f2f2'
  //     }
  //   }
  palette: {
    mode: 'dark',
  },
})

const LIGHT_THEME = createTheme({
  //   ...baseTheme,
  // palette: {
  //   type: 'light',
  //   primary: {
  //     main: '#586F05'
  //   },
  //   secondary: {
  //     main: '#93AD18'
  //   },
  //   background: {
  //     default: '#fff'
  //   },
  //   text: {
  //     primary: '#343531'
  //   }
  // }
  palette: {
    mode: 'light',
  },
})

export { DARK_THEME, LIGHT_THEME, LOCAL_STORAGE_KEY }
