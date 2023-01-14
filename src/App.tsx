import React from 'react';
import './App.css';
import Game from './components/Game'
import { Switch, Route } from "react-router-dom";
import Wins from './components/Wins'
import { setupIonicReact } from '@ionic/react';
import LocalStorageStore from './context/localStorage/reducer/LocalStorageStore';
import { Provider } from 'react-redux';
setupIonicReact();
function App() {
  return (
    <div className='App'>
          <Provider store={LocalStorageStore}>
        <Switch>
          <Route exact path='/' component={Game}></Route>
          
            <Route exact path='/wins' component={Wins}></Route>
        
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
