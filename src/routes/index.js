import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Page from '@pages';
export default (app) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Page}></Route>
      </Switch>
    </BrowserRouter>
  );
};
