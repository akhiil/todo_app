/**
 * @format
 */
import React from 'react'
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Reducer, todoReducer, cacheReducer } from './src/redux/reducer';
import Thunk from 'redux-thunk';

const totalReducer = combineReducers({ todoReducer })
const store = createStore(totalReducer, applyMiddleware(Thunk));

const MainApp = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => MainApp);
