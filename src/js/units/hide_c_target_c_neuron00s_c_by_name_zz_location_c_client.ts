export function hide_c_target_c_neuron00s_c_by_name_zz_location_c_client(
     neuron00s_c_name00s:string[]
){
     for (let i = 0; i < neuron00s_c_name00s.length; i++) {
          let neuron_c_name = neuron00s_c_name00s[i];
          let neuron_obj = window["tagbrain_graph"]["neuron00s_obj00s"][neuron_c_name];
          neuron_obj.hide_c_neuron();
     }  
}