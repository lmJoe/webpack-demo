// import './style.css';
// var button = document.createElement('button');
// button.innerHTML = '新增';
// document.body.appendChild(button);
// button.onclick = function() {
//   var div = document.createElement('div');
//   div.innerHTML = 'item';
//   document.body.appendChild(div);
// }
import Counter from './counter';
import Number from './number';

Counter();
Number();
if(module.hot){
  //使用module.hot.accept()的方法监控number.js文件中是否有所更改
  module.hot.accept('./number',() => {
    document.body.removeChild(document.getElementById('number'));
    Number();
  })
}
//从上面两个不同文件可以看出，css文件不需要使用module.hot.accept()做监控，而js文件需要使用这个方法进行监控。
//原因在于：css文件在css-loader已经在底层代码中实现了module.hot.accept()的功能，vue实现能够实现此功能原因也是因为vue-loader也内置了这种功能的实现