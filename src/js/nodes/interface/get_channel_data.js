import {gEBI, dCE} from "../../units/compress_f.js";
import {send_data_ajax} from "../../units/send_data_ajax.js";
import {add_neuron_client} from "../../units/add_neuron_client.js";
import {add_to_ram} from "../../units/add_to_ram.js"
//UNITS
//#edit #delete
function transfer_obj_to_html(obj){
    let response_html = "";
    for (let pair_array of Object.entries(obj)) {
        response_html += "<div class='post_row'>"+ pair_array.join(": ") + "</div>";
    }
    return response_html;
}
//NODE
   //LISTENERS
   document.addEventListener('DOMContentLoaded',function(){
        gEBI("get_channel_data").addEventListener('click', function() {
            get_channel_data_controller();
        })
    });

   //CONTROLLER
    function get_channel_data_controller(){
        console.log("start controller");
        let data = {
            channel_name: gEBI("page_tag_map_name").textContent.trim(),
        }
        let url = "php/statistic/get_channel_data.php";
        let error_message = "Error get channel data";
        let controller_f = function(response_obj){
            if(response_obj.status == "success"){
                let content = transfer_obj_to_html(response_obj.brain_data);
                if(gEBI("brain_data"))
                    gEBI("brain_data").remove();
                let neuron_obj = add_neuron_client("brain_data", content, false, false, false);
                add_to_ram(neuron_obj.shell, "brain_data", true);
            }
        };
        send_data_ajax(data, url, controller_f, false, error_message);
        //ajax get data in new neuron
    }