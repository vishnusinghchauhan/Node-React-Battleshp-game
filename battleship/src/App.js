import React from 'react';
import { Provider } from "react-redux";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './App.css';
import store from './store/configureStore';
import { Router } from 'react-router-dom';
import history from "./history"
import Routes from './routes';
import Header from './common/Header'

function App() {
  return (
    <div id="fullSection">
          <Provider store={store}>
            <Router history={history}>
                    <div>
                        <Header />
                        <Routes />
                    </div>
            </Router>
        </Provider>
    </div>
  );
}

export default App;
