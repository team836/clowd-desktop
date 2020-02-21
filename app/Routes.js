import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import LoginPage from './containers/LoginPage';
import DasboardPage from './containers/DashboardPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.DASHBOARD} component={DasboardPage} />
      <Route path={routes.HOME} component={LoginPage} />
    </Switch>
  </App>
);
