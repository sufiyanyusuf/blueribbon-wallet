/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppContainer from './src/AppContainer';
import {name as appName} from './app.json';
import React, { Component } from 'react';
import { StateContext, DispatchContext } from './src/redux/contexts';
import useCombinedReducers from 'use-combined-reducers';

const App = () => {

    const [state, dispatch] = useCombinedReducers({

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
