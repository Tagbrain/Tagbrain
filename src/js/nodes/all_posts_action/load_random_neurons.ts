import {add_neuron_client} from "../../units/add_neuron_client.js";
import {gEBI, dCE} from "../../units/compress_f.js";
import {send_data_ajax} from "../../units/send_data_ajax.js";

export function generate_random_neuron_image(){
    send_request();
}

function send_request(){
    let data = {
        parameter: 'get_random_neurons',
        graph_name: gEBI("page_tag_map_name").textContent.trim(),
        amount: 20,
        search_keys: "empty",
      };
      let url = "php/neurons/controller_getting_graph_data.php";
      let controller_f = function(response_obj: any){
        if(response_obj.status == "success"){
          if(response_obj["data"] != null){
            parse_neuron(response_obj["data"] , response_obj["contenteditable"]);
            if(gEBI("loading_flag") != false){
              gEBI("loading_flag").remove(); 
            }
          }
        } else {
          console.log("Error 3454");
        }
      };
      let error_message = "Search data not load";
      send_data_ajax(data, url, controller_f, true, error_message);
}

function parse_neuron(data: any, contenteditable: any){
  for(let i = 0; i < data.length; i++){
    let id: string = data[i]["neuron_id"];
    let time: string = data[i]["time_last_change"];
    let content = data[i]["neuron_tree_json"];
    add_neuron_client(id, content, contenteditable, false, true);
  }
  
}