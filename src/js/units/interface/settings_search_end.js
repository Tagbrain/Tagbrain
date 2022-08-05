function gEBI(id, parent) {
    return (parent || document).getElementById(id);
}

let settings_container = gEBI("settings_objects_search"),
search_input = gEBI("search_input_block");
if(gEBI("sprite_assosiation")){
    let assosiation = gEBI("sprite_assosiation"),
    intersection = gEBI("sprite_intersection"),
    radio_buttons = [assosiation, intersection];
}

search_input.addEventListener("focusin", () => {
    let classes = settings_container.classList;
    classes.remove('collaps_block');
    classes.add('open_collapsed_block');
})
search_input.addEventListener("focusout", (e) => {
    if (settings_container.contains(e.relatedTarget)){
        search_input.focus();
    } else {
        let classes = settings_container.classList;
        classes.remove('open_collapsed_block');
        classes.add('collaps_block');
    }
})

if(gEBI("sprite_assosiation")){
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
