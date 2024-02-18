export function hide_L_target_L_neuron00s_L_by_name_zz_location_L_client(
     neuron00s_L_name00s:string[]
){
     for (let i = 0; i < neuron00s_L_name00s.length; i++) {
          let neuron_L_name = neuron00s_L_name00s[i];
          let neuron_obj = window["tagbrain_graph"]["neuron00s_obj00s"][neuron_L_name];
          neuron_obj.hide_L_neuron();
     }  
}