import avater from './avater.jpg';
function Createavater(){
  var img = new Image();
  img.src = avater
  img.classList.add('avater')
  document.getElementById('root');
  root.append(img);
}
export default Createavater;