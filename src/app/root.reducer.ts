import {routerReducer as router} from '@angular-redux/router';
import {composeReducers, defaultFormReducer} from '@angular-redux/form';
import {combineReducers} from 'redux';

export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    router
  })
);
