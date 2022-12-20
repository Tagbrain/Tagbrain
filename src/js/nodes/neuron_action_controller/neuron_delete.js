import {send_data_ajax} from "../../units/send_data_ajax.js";
import {gEBI, dCE} from "../../units/compress_f.js";

document.addEventListener('DOMContentLoaded',function(){

    function code_and_send_data(neuron_id){

        let graph_name = gEBI("page_tag_map_name").textContent.trim(),
            time = Math.round(new Date().getTime() / 1000).toString();
    
        let data = {
          action: 'remove',
          neuron_id: neuron_id,
          neuron_tree: "",
          graph_name: graph_name,
          unix_time: time,
        };
        let url = "php/neurons/controller_neurons_change.php";
        let controller_f = function(response_obj){
            if(response_obj.status == "success"){
                console.log(response_obj);
            }
        };
        let error_message = "Search data not load";
        send_data_ajax(data, url, controller_f, true, error_message);
    }

    //transfer in click file #edit
    document.addEventListener("click", function(e) {
        e = e || window.event;
        var delete_button_block = e.target;
        if (delete_button_block.classList.contains("delete_neuron_button") == true){
            let remove_or_not = confirm("Do you want to delete the item?");
            if (remove_or_not == true){
                try{
                    let neuron_shell = delete_button_block.parentNode.parentNode.parentNode;
                    let neuron_id = neuron_shell.id;
                    let neuron = gEBI(neuron_id+"_neuron");
                    code_and_send_data(neuron_id);
                    neuron_shell.remove(); 
                } catch (err){
                    console.log("item won't remove<br><br>" + err);
                }
            }
        }
    });
    
});