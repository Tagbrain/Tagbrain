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

function node_inside_neuron(node, neuron_class){
    if(node.classList.contains(neuron_class) == true){
        return {
            inside_neuron: true,
            neuron_id: node.id,
        }
    }
    while (node.classList.contains(neuron_class) != true) {
        node = node.parentNode;
        if(node !== document.body){
            if (node.classList.contains(neuron_class) == true) {
                return {
                    inside_neuron: true,
                    neuron_id: node.id,
                }
            }
        } else {
            break;
        }
    }
    return {
        inside_neuron: false,
        neuron_id: undefined,
    }
}

export function toggle_pop_up(remove_class, add_class, el_cls, back_layer_element, pointer_e_stl){
    el_cls.remove(remove_class);
    back_layer_element.style.pointerEvents = pointer_e_stl;
    el_cls.add(add_class);
}
function close_pop_up_click_outside(e, neuron_pop_up_menu, el_cls, upper_layer_for_animation){
    e.preventDefault();
    e = e || window.event;
    let neuron = e.target,
    obj_neuron = node_inside_neuron(neuron, "item")
    if(obj_neuron.inside_neuron == false){
        toggle_pop_up('neuron_pop_up_show', 'neuron_pop_up_hide', el_cls, upper_layer_for_animation, 'none');
        document.removeEventListener("click", function (e){close_pop_up_click_outside(e, neuron_pop_up_menu, el_cls, upper_layer_for_animation)}, false);
    }
    
}
function show_context_pop_up(e, el_cls, upper_layer_for_animation){
    toggle_pop_up('neuron_pop_up_hide', 'neuron_pop_up_show', el_cls, upper_layer_for_animation, 'visible');
    neuron_pop_up_menu.style.top = e.clientY + "px";
    neuron_pop_up_menu.style.left = e.clientX + "px";
    let options = {
        once: true,
    };
    document.addEventListener("click", function (e){close_pop_up_click_outside(e, neuron_pop_up_menu, el_cls, upper_layer_for_animation)}, options);
}

let neuron_pop_up_menu = gEBI("neuron_pop_up_menu");
let neurons_container = gEBI("neurons_x_tab_content_c_container");
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    e = e || window.event;
    let neuron = e.target,
    obj_node = node_inside_neuron(neuron, "item"),
    el_cls = neuron_pop_up_menu.classList;

    if(obj_node.inside_neuron == true){
        if(el_cls.contains("neuron_pop_up_hide")){
            show_context_pop_up(e, el_cls, upper_layer_for_animation);
        } else {
            toggle_pop_up('neuron_pop_up_show', 'neuron_pop_up_hide', el_cls, upper_layer_for_animation, 'none');
        }
    } else {
        toggle_pop_up('neuron_pop_up_show', 'neuron_pop_up_hide', el_cls, upper_layer_for_animation, 'none');
    }  
});




