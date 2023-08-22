import React from 'react'
import { createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import ThemeHandler from './utils/Theming/ThemeProvider.jsx'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers/index.js'
// import storage from 'redux-persist/lib/storage'
// import { persistReducer, persistStore } from 'redux-persist'
// import { PersistGate } from 'redux-persist/integration/react'
import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
// import { Typography } from '@mui/material'
import TopBar from './components/TopBar'
import ListeVilles from './components/ListeVilles.jsx'
import Ephemeride from './components/Ephemeride.jsx'
import PrevisionsList from './components/PrevisionsList.jsx'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  // reducer: persistedReducer,
  reducer: rootReducer,
})

// export const persistor = persistStore(store)

function App() {
  return (
    <>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <ThemeHandler>
          <CssBaseline />
          <TopBar />
          <ListeVilles />
          <Ephemeride />
          <PrevisionsList />
        </ThemeHandler>
        {/* </PersistGate> */}
      </Provider>
    </>
  )
}

export default App
