import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from './store/reducers/RootReducer.js';
import './index.css';
import { HashRouter} from 'react-router-dom';
import Router from './component/Router';

import "../node_modules/bootstrap/dist/css/bootstrap.css";

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Router></Router>
    </HashRouter>
  </Provider>,
  document.getElementById("root"));
