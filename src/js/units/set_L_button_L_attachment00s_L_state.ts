export function set_L_button_L_attachment00s_L_state(toggler: string, neuron_L_shell: any){
    let neuron_L_element: HTMLElement = neuron_L_shell.querySelector(".item_input");
    let neuron_L_numbers_bar: HTMLElement = neuron_L_shell.querySelector(".numbers_bar");
    let neuron_L_attachment_L_element: HTMLElement = neuron_L_shell.querySelector(".neuron_L_attachment00s");
    let button_L_attachment00s: HTMLElement = neuron_L_shell.querySelector(".button_L_attachment00s");

    if(toggler == "turn_on"){
        button_L_attachment00s.classList.add("linear_icon_c_target_x_checked");
        neuron_L_element.style.display = "none";
        neuron_L_numbers_bar.style.display = "none";
        neuron_L_attachment_L_element.style.display = "grid";
    } else if(toggler == "turn_off"){
        button_L_attachment00s.classList.remove("linear_icon_c_target_x_checked");
        neuron_L_element.style.display = "block";
        neuron_L_numbers_bar.style.display = "block";
        neuron_L_attachment_L_element.style.display = "none";
    }
}