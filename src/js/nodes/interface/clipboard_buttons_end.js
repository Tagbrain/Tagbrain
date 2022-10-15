let copy_symbol_button = document.querySelectorAll(".tools_button_copy");
for(i = 0; i < copy_symbol_button.length; i++){
  copy_symbol_button[i].addEventListener('click', function(){ 
    let value_copy_button = this.innerText;
    navigator.clipboard.writeText(value_copy_button);
  })
}

const work_mode_button = document.querySelector("#work_mode_button"),
      page_element = document.documentElement;
work_mode_button.addEventListener('click', function(){ 
  let container_work = document.querySelector(".container_work");
  let CW_CL = container_work.classList;
  if( window.innerHeight == screen.height) {
    closeFullscreen();
    if(CW_CL.contains('CW_power_mode')){
      CW_CL.remove('CW_power_mode');
    } 
  } else {
    openFullscreen();
    if(document.querySelector(".animation_erythrocytes")){
      document.querySelector(".animation_erythrocytes").remove();
    }
    //if(document.querySelector(".background_svg")){
      //document.querySelector(".background_svg").remove();
    //}
    if(CW_CL.contains('CW_power_mode')){
      CW_CL.remove('CW_power_mode');
    } else {
      CW_CL.add('CW_power_mode');
    }
    //change size items
  }
}) 

function openFullscreen(){
if (page_element.requestFullscreen) {
    page_element.requestFullscreen();
  } else if (page_element.mozRequestFullScreen) {
    page_element.mozRequestFullScreen();
  } else if (page_element.webkitRequestFullscreen) { 
    page_element.webkitRequestFullscreen();
  } else if (page_element.msRequestFullscreen) {
    page_element.msRequestFullscreen();
  }
}
function closeFullscreen() {
  if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { 
    document.webkitExitFullscreen();
  } else {
    document.exitFullscreen();
  }
}