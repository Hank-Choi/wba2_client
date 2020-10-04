import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {createBrowserHistory} from "history";
import {UserContextProvider} from "./Context";


const history = createBrowserHistory()

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter history={history}>
      <UserContextProvider>
        <App history={history}/>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
