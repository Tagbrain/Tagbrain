//UNITS
function gEBI(id, parent) {
    return (parent || document).getElementById(id);
}
//DEF
let settings_container = gEBI("settings_objects_search"),
context_search_input = gEBI("send_search_request"),
search_input = gEBI("search_input_block");

if(gEBI("sprite_association")){
    let association = gEBI("sprite_association"),
    intersection = gEBI("sprite_intersection"),
    radio_buttons = [association, intersection];
}

if(gEBI("sprite_association")){
    radio_buttons.forEach(some_radio => {
        some_radio.addEventListener("click", (e) => {
            let classes = some_radio.classList;
            if(classes.contains("active_icon") == false){
                search_input.focus();
                classes.add('active_icon');
            } else {
                search_input.focus();
                classes.remove('active_icon');
            }
        })
    })
}

//NODE
    //LISTENER

context_search_input.addEventListener("click", () => {
    let classes = settings_container.classList;
    let arrow_pos = context_search_input.classList;
    if(classes.contains("collaps_block")){
        classes.remove('collaps_block');
        classes.add('open_collapsed_block');
        arrow_pos.add("arrow_down");
    } else {
        classes.remove('open_collapsed_block');
        classes.add('collaps_block');
        arrow_pos.remove("arrow_down");
    }
})

    //CONTROLLER