// var Header = require('./header.js');
// var Sidebar = require('./sidebar.js');
// var Content = require('./content.js');
// var avater = require('./avater.jpg');
// console.log(avater.default)

import avater from './avater.jpg';
import Createavater from './createavater';
import style from './index.less';
import avaterVue from './avater.vue';
Createavater();

var img = new Image();
img.src = avater
img.classList.add(style.avater)
document.getElementById('root');
root.append(img);
// new Header;
// new Sidebar;
// new Content;