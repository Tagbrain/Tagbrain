
export function get_neuron00s_L_id00s_L_without_ram(
    neuron00s_L_id00s: string[], 
    neuron00s_L_ram_x_id00s: string[]
){
    let neuron00s_id00s_L_without_ram:string[] = neuron00s_L_id00s.filter(
        x => !neuron00s_L_ram_x_id00s.includes(x) 
    );  
    return neuron00s_id00s_L_without_ram;
}