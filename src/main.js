import './styles/app.scss';
import Nav from './components/Nav';
import * as components from './components';

document.addEventListener("DOMContentLoaded", function() {
  Object.keys(components).forEach((componentName) => {
    const elements = document.querySelectorAll(`[data-component='${componentName}']`);

    elements.forEach((el) => {
      new components[componentName](el);
    });
  });
});
