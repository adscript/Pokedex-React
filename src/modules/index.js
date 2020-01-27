import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Router } from "react-router-dom";
import store, { history } from "../store";
import {
  PokeList, 
  PokeDetail,
  MyPokemon
} from '../containers';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../utils'


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router history={history}>
            <Route exact path="/" component={PokeList} />
            <Route path="/details" component={PokeDetail} />
            <Route path="/my-list" component={MyPokemon} />
          </Router>
        </ConnectedRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;