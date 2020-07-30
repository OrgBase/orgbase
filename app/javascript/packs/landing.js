import 'stylesheets/landing/style';
import anime from 'animejs/anime'
import ScrollReveal from 'scrollreveal';

window.anime = anime;
window.ScrollReveal = ScrollReveal;

require('lander');

require.context('../stylesheets/img', true);

