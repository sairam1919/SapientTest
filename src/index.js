import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from './store/reducers/RootReducer.js';
import './index.css';
import { HashRouter } from 'react-router-dom';
import Router from './Router';

import "../node_modules/bootstrap/dist/css/bootstrap.css";

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
    middleware.push(createLogger());
}

const store = createStore(
    rootReducer, {},
    composeWithDevTools(applyMiddleware(...middleware))
);

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://Sairam:Sairam@jaracluster-lwrsl.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log(collection);
//   client.close();
// }); 

ReactDOM.render( <Provider store = { store } >
    <HashRouter >
    <Router  /> 
    </ HashRouter > 
    </Provider>,
    document.getElementById("root"));