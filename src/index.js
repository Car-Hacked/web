import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.scss';
import { AppContainer } from 'react-hot-loader';

import Main from './js/main';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Main);

if (module.hot) {
  module.hot.accept('./js/main', () => {
    const nextMain = require('./js/main').default;
    render(nextMain);
  });
}
