import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { BiPlayCircleFill, BiPauseCircleFill } from 'oh-vue-icons/icons';

addIcons(BiPlayCircleFill, BiPauseCircleFill);

const app = createApp(App);
app.component('v-icon', OhVueIcon);
app.mount('#app');
