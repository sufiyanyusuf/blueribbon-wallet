/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppContainer from './src/AppContainer';
import {name as appName} from './app.json';
import React, { Component } from 'react';
import { StateContext, DispatchContext } from './src/redux/contexts';

import reducers from './src/redux/reducers';
import globalState from './src/redux/state';
import useCombinedReducers from 'use-combined-reducers';

const App = () => {

    const [state, dispatch] = useCombinedReducers({
        currentOrder: React.useReducer(reducers.orderReducer, globalState.currentOrder),
        currentOrderSemantics: React.useReducer(reducers.orderSemanticsReducer, globalState.currentOrderSemantics),
        pricing: React.useReducer(reducers.pricingReducer, globalState.currentPricing),
        user: React.useReducer(reducers.userReducer, globalState.user),
      });

    return(
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                <AppContainer />
            </StateContext.Provider>
        </DispatchContext.Provider>
    )
  

}


AppRegistry.registerComponent(appName, () => App);
