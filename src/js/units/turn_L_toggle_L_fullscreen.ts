
export function turn_L_toggle_L_fullscreen(target_L_toggle: string | false){
    let container_work = document.querySelector(".container_work");
    let CW_CL = container_work.classList;
    if(target_L_toggle == false){
        if(document.fullscreenElement) {
            closeFullscreen(CW_CL);
        } else {
            openFullscreen(CW_CL);
        }
    } else if(target_L_toggle == "turn_on"){
        if(!document.fullscreenElement) {
            openFullscreen(CW_CL);
        }
    } else if(target_L_toggle == "turn_off"){
        if(document.fullscreenElement) {
            closeFullscreen(CW_CL);
        } else {
            if(window["tagbrain_graph"]["checker_collection"]["power_mode"].is_activated){
                window["tagbrain_graph"]["checker_collection"]["power_mode"].change_state_checker();
            }
        }
    }

}
let page_element:any = document.documentElement;
function openFullscreen(CW_CL:any){

    if(CW_CL.contains('container_work_mode_power')){
        CW_CL.remove('container_work_mode_power');
    } else {
        CW_CL.add('container_work_mode_power');
    }
    var requestMethod = page_element.requestFullScreen || page_element.webkitRequestFullScreen || page_element.mozRequestFullScreen || page_element.msRequestFullScreen;
    if (requestMethod) { // Native full screen.
        requestMethod.call(page_element);
    } 
}

function closeFullscreen(CW_CL:any) {
    if(CW_CL.contains('container_work_mode_power')){
        CW_CL.remove('container_work_mode_power');
    } 
    let doc:any = document;
    if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) { 
        doc.webkitExitFullscreen();
    } else {
        doc.exitFullscreen();
    }
}