import "@fortawesome/fontawesome-free/js/all";
import 'stylesheets/room/style';
import Rails from '@rails/ujs';

Rails.start();

const componentRequireContext = require.context('components/room', true);
const ReactRailsUJS = require('react_ujs');

ReactRailsUJS.useContext(componentRequireContext);