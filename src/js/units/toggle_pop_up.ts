export function toggle_pop_up(
    remove_class: string, 
    add_class: string, 
    el_cls: any, 
    back_layer_element: any, 
    pointer_L_stl: any
){
    el_cls.remove(remove_class);
    back_layer_element.style.pointerEvents = pointer_L_stl;
    el_cls.add(add_class);
}