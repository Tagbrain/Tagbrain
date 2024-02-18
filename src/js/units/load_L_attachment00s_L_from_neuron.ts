import { class_L_attachment_L_creator } from "../classes/class_L_attachment_L_creator";
import { dCE } from "./compress_f";
import { send_data_ajax } from "./send_data_ajax";

type neuron_L_data = {
    graph_L_name: string,
    neuron_L_id: string,
    neuron_L_shell: Element
}

export function load_L_attachment00s_L_from_neuron(
    attachment00s_L_name00s:string[], 
    neuron_L_data: neuron_L_data,
    neuron_L_id: string
){
    let attachment00s_L_name00s_X_all = window["tagbrain_graph"]["neuron00s_obj00s"][neuron_L_id]["attachment00s"];

    let data = {
        action: "load_L_attachment00s_X_if_exist",
        attachment00s_L_name00s_X_all: attachment00s_L_name00s_X_all,
        attachment00s_L_name00s: attachment00s_L_name00s,
        graph_name: neuron_L_data.graph_L_name,
        neuron_L_id: neuron_L_data.neuron_L_id
    };
    let url = "php/neurons/controller_L_api.php";
    let controller_f = function(response_obj: any){
        if(response_obj.status == "success"){

            //clean_L_attachment00s_X_container
            let neuron_L_container_L_attachment00s = neuron_L_data.neuron_L_shell.querySelector(".neuron_L_attachment00s");
            neuron_L_container_L_attachment00s.innerHTML = '';

            //print_L_attachment00s_X_container     
            let txt00s_L_microfeature00s = response_obj.data["txt00s"];
            for (let i = 0; i < txt00s_L_microfeature00s.length; i++) {
                let attachment_L_key = txt00s_L_microfeature00s[i][0];
                let attachment_L_value = txt00s_L_microfeature00s[i][1];
                new class_L_attachment_L_creator(
                    neuron_L_data.neuron_L_shell,
                    attachment_L_key,
                    attachment_L_value,
                    neuron_L_data.neuron_L_id,
                    "txt"
                );
                
            }
            let img00s_L_microfeature00s =  response_obj.data["img00s"];
            for (let i = 0; i < img00s_L_microfeature00s.length; i++) {
                let attachment_L_key = img00s_L_microfeature00s[i][0];
                let attachment_L_value = img00s_L_microfeature00s[i][1];
                new class_L_attachment_L_creator(
                    neuron_L_data.neuron_L_shell,
                    attachment_L_key,
                    attachment_L_value,
                    neuron_L_data.neuron_L_id,
                    "img"
                );
            }


            let unit00s_L_attachment_L_no = response_obj.data["attachment_L_no"];
            for (let i = 0; i < unit00s_L_attachment_L_no.length; i++) {
                new class_L_attachment_L_creator(
                    neuron_L_data.neuron_L_shell,
                    unit00s_L_attachment_L_no[i],
                    false,
                    neuron_L_data.neuron_L_id,
                    "creator"
                );
            }

            let attachment00s_L_old_X_name00s = response_obj.data["old_L_attachment00s"];
            //append_L_container
            let container_L_attachment00s = neuron_L_data.neuron_L_shell.querySelector(".neuron_L_attachment00s");
            let container_L_tag00s = dCE("div");
            container_L_tag00s.className = "container_L_tag00s";
            container_L_attachment00s.appendChild(container_L_tag00s);
            for (let i = 0; i < attachment00s_L_old_X_name00s.length; i++) {
                let attachment_L_name = attachment00s_L_old_X_name00s[i];

                //creator
                let attachment_deletor = dCE("div");
                attachment_deletor.className = "tab_button";
                attachment_deletor.innerHTML = '<span>'
                        + attachment_L_name
                    + '</span>'
                    + '<a class="remove_tab" title="Remove the old attachment">✕</a>';
                container_L_tag00s.appendChild(attachment_deletor);

                put_L_listner_L_delete_attachment(neuron_L_data.neuron_L_id, attachment_L_name, attachment_deletor);
            }
        }
    };
    let error_message = "Search data not load";
    send_data_ajax(data, url, controller_f, true, error_message);  
}
function put_L_listner_L_delete_attachment(
    neuron_L_id: string, 
    attachment_L_name: string, 
    tab_L_attachment: Element
){
    let remove_L_button = tab_L_attachment.children[1];
    remove_L_button.addEventListener("click", (e:any) => {
        let data = {
            action: "remove_L_attachment00s",
            attachment00s_L_name00s: [attachment_L_name],
            graph_name: window["tagbrain_graph"]["graph_name"],
            neuron_L_id: neuron_L_id
        };
        let url = "php/neurons/controller_L_api.php";
        let controller_f = function(response_L_obj: any){
            if(response_L_obj.status = "success"){
                tab_L_attachment.remove();
            }
            //remove client if success
        }
        let error_message = "Search data not load";
        send_data_ajax(data, url, controller_f, true, error_message); 
    });

}