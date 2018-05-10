import './styles/app.scss';
import * as components from './components';

const App = {
  components: []
};

document.addEventListener("DOMContentLoaded", function() {
  Object.keys(components).forEach((componentName) => {
    const elements = document.querySelectorAll(`[data-component='${componentName}']`);

    elements.forEach((el) => {
      App.components.push(new components[componentName](el));
    });
  });
});
