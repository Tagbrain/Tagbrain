
export function put_L_marker_L_not_save(neuron_shell: HTMLElement, graph_L_name:string){
    let save_flag_container = neuron_shell.querySelector(".save_flag");
    if(save_flag_container != null){
        save_flag_container.innerHTML = " ●";
    }
    document.title = document.title = "● | " + graph_L_name;
}