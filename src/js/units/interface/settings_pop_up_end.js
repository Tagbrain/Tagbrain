let upper_layer_for_animation = document.querySelector(".upper_layer_for_animation");
let shadow_container = document.querySelector(".shadow_background_container_pos");

function gEBI(id, parent) {
    return (parent || document).getElementById(id);
}

if(gEBI("setting_button")){
    let setting_button = gEBI("setting_button");
    setting_button.addEventListener("click", function(e){
        upper_layer_for_animation.style.pointerEvents = "visible";
        shadow_container.style.display = "grid";
    });
}

if(gEBI("exit_button")){
    let exit_button = gEBI("exit_button");
    exit_button.addEventListener("click", function(e){
        let central_pop_up_block = gEBI("central_pop_up_block");
        let upper_layer_for_animation = document.querySelector(".upper_layer_for_animation");
        upper_layer_for_animation.style.pointerEvents = "none";
        shadow_container.style.display = "none";
    }); 
}

function node_inside_post(node, post_class){
    if(node.classList.contains(post_class) == true){
        return {
            inside_post: true,
            post_id: node.id,
        }
    }
    while (node.classList.contains(post_class) != true) {
        node = node.parentNode;
        if(node !== document.body){
            if (node.classList.contains(post_class) == true) {
                return {
                    inside_post: true,
                    post_id: node.id,
                }
            }
        } else {
            break;
        }
    }
    return {
        inside_post: false,
        post_id: undefined,
    }
}

export function toggle_pop_up(remove_class, add_class, element_classlist, back_layer_element, pointer_e_stl){
    element_classlist.remove(remove_class);
    back_layer_element.style.pointerEvents = pointer_e_stl;
    element_classlist.add(add_class);
}

let post_pop_up_menu = gEBI("post_pop_up_menu");
let items_container = gEBI("items_container");
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    e = e || window.event;
    let post = e.target,
    obj_node = node_inside_post(post, "item"),
     classes = post_pop_up_menu.classList;

    if(obj_node.inside_post == true){
        if(classes.contains("post_pop_up_hide")){
            toggle_pop_up('post_pop_up_hide', 'post_pop_up_show', classes, upper_layer_for_animation, 'visible');
            post_pop_up_menu.style.top = e.clientY + "px";
            post_pop_up_menu.style.left = e.clientX + "px";
        } else {
            toggle_pop_up('post_pop_up_show', 'post_pop_up_hide', classes, upper_layer_for_animation, 'none');
        }
    } else {
        toggle_pop_up('post_pop_up_show', 'post_pop_up_hide', classes, upper_layer_for_animation, 'none');
    }  
});




