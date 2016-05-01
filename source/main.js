import React from 'react';
import { render } from 'react-dom';

import Icon from './components/Icon.jsx';

const icons = document.getElementById('js-icons');
render(<Icon width="365" height="365" radius="10"/>, icons);
