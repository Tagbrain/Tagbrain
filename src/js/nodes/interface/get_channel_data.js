import {gEBI, dCE} from "../../units/compress_f.js";
import {send_data_ajax} from "../../units/send_data_ajax.js";
import {add_neuron} from "../../units/add_neuron.js";
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
                let time = new Date();
                let neuron = add_neuron("brain_data_"+time.getSeconds(), content, false, false, false);
                add_to_ram(neuron, "brain_data", false, true);
            }
        };
        send_data_ajax(data, url, controller_f, false, error_message);
        //ajax get data in new neuron
    }