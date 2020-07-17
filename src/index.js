import React from 'react';

import App from '@app';
import Action from '@action';
import routes from '@routes';
import models from '@models';
import {onEffect, onFetchOption} from '@utils/reduxUtils';

const app = new App({
  onEffect,
  onFetchOption,
});

app.setModels(models);
app.setRouter((r) => routes(r));
app.start('#root');

new Action({
  dispatch: app._store.dispatch,
});
