export function focus_c_neuron_x_scroll(neuron_id:string){
    let neuron_obj = window["tagbrain_graph"]["neurons_objs"][neuron_id];
    let offset:number = neuron_obj.neuron_el.offsetTop;
    let name_tab = neuron_obj.neuron_c_container_c_tab;
    let neuron_container = window["tagbrain_graph"]["tab_collection"][name_tab]["mental_image_container"];
    let neuron_offset = offset - neuron_container.getBoundingClientRect().top - 40;
    neuron_container.scroll({
        top: neuron_offset,
        left: 0,
        behavior: "smooth",
    });
}