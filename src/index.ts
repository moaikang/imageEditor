import {App} from './App';
import '../static/scss/index.scss'

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#root') as HTMLElement;
    new App(root);
});
