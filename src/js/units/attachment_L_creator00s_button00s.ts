import { class_L_attachment_L_creator } from "../classes/class_L_attachment_L_creator";
import { dCE } from "./compress_f";
import { send_data_ajax } from "./send_data_ajax";

export function attachment_L_creator00s_button00s(
    container_L_button00s_L_creator_attachment00s: Element,
    attachment_L_name: string,
    neuron_L_id: string
){
    let array = [
        { 
            key_L_type: "txt",
            key_dir_name: "txt00s",
        },
        { 
            key_L_type: "img",
            key_dir_name: "img00s",
        },
        { 
            key_L_type: "ai",
            key_dir_name: "ai00s",
        },
        { 
            key_L_type: "latex",
            key_dir_name: "latex00s",
        }
    ];
    for (let i = 0; i < array.length; i++) {
        const obj = array[i];
        let attachment_L_unit = dCE("a");
        attachment_L_unit.innerHTML = obj.key_L_type;
        if(obj.key_L_type == "txt"){
            attachment_L_unit.classList.add('tag_solid');
        } else {
            attachment_L_unit.classList.add('tag_solid', 'developing');
        }
        container_L_button00s_L_creator_attachment00s.appendChild(attachment_L_unit);
        attachment_L_unit.addEventListener("click", function(){
            let data = {
                action: "change_L_attachment",
                direction_L_name: obj.key_dir_name,
                type: obj.key_L_type,
                attachment_L_key: attachment_L_name,
                attachment_L_value: "A new attachment",
                neuron_L_id: neuron_L_id,
                graph_L_name: window["tagbrain_graph"]["graph_name"],
            };
            let url = "php/neurons/controller_L_api.php";
            let error_message = "Request error";
            let controller_f = function(response_obj: any){
                if(response_obj.status == "success"){
                    //add_L_attachment container_L_button00s_L_creator_attachment00s
                    console.log("Attachment is created");
                    new class_L_attachment_L_creator(
                        window["tagbrain_graph"]["neuron00s_obj00s"][neuron_L_id].neuron_shell,
                        attachment_L_name,
                        "A new attachment",
                        neuron_L_id,
                        "txt"
                    );
                    
                }
            };
            send_data_ajax(data, url, controller_f, true, error_message);  
        })
    }
}