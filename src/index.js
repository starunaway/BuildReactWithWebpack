import React from 'react';
import ReactDom from 'react-dom';
import Page from '@pages';

import App from '@app';
import Action from '@action';
import routes from '@routes';
import models from '@models';
import {onEffect, onFetchOption} from '@utils/reduxUtils';

ReactDom.render(<Page />, document.getElementById('root'));
