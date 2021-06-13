import {App} from './App';
import '../static/scss/index.scss'

window.onload = () => {
    const root = document.querySelector('#root') as HTMLElement;
    const app = new App(root);
}
