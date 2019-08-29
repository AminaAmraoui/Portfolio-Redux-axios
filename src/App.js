import React from 'react';
import './App.css';
import CApp from './components/CApp'
import {Provider} from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <CApp/>
  </Provider>
  );
}

export default App;
