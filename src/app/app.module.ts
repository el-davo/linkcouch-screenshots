import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {createLogger} from 'redux-logger';
import {environment} from '../environments/environment';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import * as reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import * as persistState from 'redux-localstorage';
import {NgRedux, NgReduxModule} from '@angular-redux/store';
import {NgReduxRouter, NgReduxRouterModule} from '@angular-redux/router';

import {AppComponent} from './app.component';
import {rootReducer} from './root.reducer';
import {NgReduxFormModule} from '@angular-redux/form';
import {RouterModule} from '@angular/router';
import {Angulartics2GoogleAnalytics, Angulartics2Module} from 'angulartics2';
import {routes} from './routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    BrowserModule,
    NgReduxRouterModule,
    NgReduxModule,
    NgReduxFormModule,
    NgReduxRouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private ngRedux: NgRedux<any>,
              ngReduxRouter: NgReduxRouter) {

    const epics = combineEpics(
    );

    const middleware = [
      createEpicMiddleware(epics),
      createLogger(),
      reduxImmutableStateInvariant.default()
    ];

    const enhancers = [];

    if (environment.hmr) {
      enhancers.push(persistState());
    }

    this.ngRedux.configureStore(rootReducer, {}, middleware, enhancers);

    ngReduxRouter.initialize();
  }
}
