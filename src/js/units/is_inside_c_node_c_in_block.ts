export function is_inside_c_node_c_in_block(node: HTMLElement, neuron_class: string){
    if(node.classList.contains(neuron_class) == true){
        return {
            inside_neuron: true,
            neuron_id: node.id,
        }
    }
    while (node.classList.contains(neuron_class) != true) {
        if(node.parentElement){
            node = node.parentElement;
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
    }
    return {
        inside_neuron: false,
        neuron_id: undefined,
    }
}