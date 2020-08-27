import React from 'react';
import ReactDOM from 'react-dom';
import home from './home';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter, Switch } from "react-router-dom";


const Index = ({ component: Component }) => (
  <Route render={props =>
    <Component {...props} />}
  />
)

const routing = (
  <BrowserRouter>
    <div>
      <Switch>
        <Index exact path='/' component={home} />
      </Switch>
    </div>
  </BrowserRouter>
);

ReactDOM.render(routing, document.getElementById('root'));
serviceWorker.register();


