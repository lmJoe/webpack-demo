// //同步引入
// import _ from 'lodash';
// console.log(_.join(['a','b','c'],'***'));
// console.log(_.join(['a','b','c'],'***'));
//异步引入

import _ from 'lodash';
//业务逻辑
function getComponent() {
  return import(/*webpackChunkName:"lodash"*/'lodash').then(({ default:_ })=>{
    var element = document.createElement('div');
    element.innerHtml = _.join(['A','B','C'],'-');
    return element;
  })
}
getComponent().then(element => {
  document.body.appendChild(element);
})