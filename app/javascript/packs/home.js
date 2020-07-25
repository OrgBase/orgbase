import Rails from '@rails/ujs';

Rails.start();

const componentRequireContext = require.context('components/home', true);
const ReactRailsUJS = require('react_ujs');

ReactRailsUJS.useContext(componentRequireContext);
