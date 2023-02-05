import { gEBI, dCE } from "./compress_f.js";
export function add_wave_animation_x_click_c_event(e: any, message: string) {

    let wave_container = gEBI("wave_container");
        
    let click_element: Element = dCE("div");
    click_element.innerHTML = message; 
    click_element.classList.add("dot");
    wave_container.append(click_element);
        
    wave_container.style.top = (e.clientY-100) + "px";
    wave_container.style.left = (e.clientX-100) + "px";
    function remove_click_animation(click_element: Element){
        click_element.remove();
    }
    setTimeout(remove_click_animation, 800, click_element);
}