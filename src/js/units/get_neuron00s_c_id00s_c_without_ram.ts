
export function get_neuron00s_c_id00s_c_without_ram(
    neuron00s_c_id00s: string[], 
    neuron00s_c_ram_x_id00s: string[]
){
    let neuron00s_id00s_c_without_ram:string[] = neuron00s_c_id00s.filter(
        x => !neuron00s_c_ram_x_id00s.includes(x) 
    );  
    return neuron00s_id00s_c_without_ram;
}