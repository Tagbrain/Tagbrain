
export function put_c_marker_c_not_save(neuron_shell: HTMLElement){
    let save_flag_container = neuron_shell.querySelector(".save_flag");
    if(save_flag_container != null){
        save_flag_container.innerHTML = " ●";
    }
}