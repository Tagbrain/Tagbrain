
document.addEventListener('DOMContentLoaded',function(){
    let scroll_speed = 3,
        scroll_location = 0,
        drag_mousedown = false,
        mousemove_refractory_i = 0,
        cursor_coords_startX = 0;
    document.addEventListener('mousedown', function(e) {
        e = e || window.event;
        var target_mousedown = e.target.parentNode;
        if (target_mousedown.className == "sense_item"){
            drag_mousedown = true;
            cursor_coords_startX = e.pageX - target_mousedown.offsetLeft;
        }
    });
    document.addEventListener('mouseup', function(e) {
        e = e || window.event;
        var target_mouseup = e.target;
        drag_mousedown = false;
        scroll_location = target_mouseup.scrollLeft;
    });
    document.addEventListener('mousemove', function(e) {
        if (window.innerWidth < 1000) {
            if (drag_mousedown) {
                mousemove_refractory_i++;
                var stop_moving_when_select = document.getSelection().toString();
                if (stop_moving_when_select == ""){
                    if (mousemove_refractory_i > 5){
                        e = e || window.event;
                        var target_mousemove = e.target.parentNode;
                        if (target_mousemove.className == "sense_item"){
                            target_mousemove.scrollLeft = scroll_location - (e.pageX - target_mousemove.offsetLeft - cursor_coords_startX)*scroll_speed;
                        }
                        mousemove_refractory_i = 0;
                    }
                }
            }
        }   
    });
})
  
  // if(screen big cancel function