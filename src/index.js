import React from 'react';
import { createRoot } from 'react-dom/client';
import './style/main.scss';

import Main from './js/main';

const render = Component => {
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(<Component />);
};

render(Main);