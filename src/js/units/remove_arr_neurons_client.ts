export function remove_arr_neurons_client(arr_id:String){
    if(Object.keys(arr_id).length > 0){
        let obj = Object.keys(arr_id);
        for(let i = 0; i < obj.length; i++){
             let neuron_id = arr_id[obj[i]];;
             let neuron_shell: any = document.getElementById(neuron_id);
             neuron_shell.remove();
        }
   }
}