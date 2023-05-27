import {gEBI, dCE} from "../units/compress_f.js";

var bottom_bar:any = document.querySelector('footer');
var container_work:any = document.querySelector('.container_work');
var header_bar:any = document.querySelector('.header');
var viewport = window.visualViewport;
function viewportHandler() {
    var layoutViewport = gEBI('layoutViewport');
    if(viewport != null){
        const offsetLeft = viewport.offsetLeft;
        const keyboard_height = viewport.height - layoutViewport.getBoundingClientRect().height;
        const offsetTop = keyboard_height + viewport.offsetTop;

        // You could also do this by setting style.left and style.top if you
        // use width: 100% instead.
        bottom_bar.style.transform = `translate(${offsetLeft}px, ${offsetTop}px) scale(${1 / viewport.scale})`;
        container_work.style.height = `${container_work.getBoundingClientRect().height - keyboard_height}px`;
    }
}
if(window.visualViewport){
    window.visualViewport.addEventListener('scroll', viewportHandler);
    window.visualViewport.addEventListener('resize', viewportHandler);
}
