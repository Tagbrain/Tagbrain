import { generate_c_graph_c_environment } from "../nodes/all_posts_action/generate_c_graph_c_environment";
import { send_data_ajax } from "./send_data_ajax";

export function remove_L_graph(graph_L_for_delete:any){

    let url = 'php/neurons/controller_c_api.php';
    let data = {
        action: "delete_L_graph",
        graph_L_name: graph_L_for_delete,
    }
    
    let controller_f = function (response_obj: any) {
        if (response_obj.status == "success") {
            window["tagbrain_graph"]["graph00s_c_user"] = window["tagbrain_graph"]["graph00s_c_user"].filter(function( obj:any ) {
                return obj != graph_L_for_delete;
            });
            if(window["tagbrain_graph"]["graph00s_c_user"][0] == undefined){//graph_L_first_X_not_exist
                history.pushState({}, '', '/'+ "project");
                generate_c_graph_c_environment("project");
            } else {//graph_L_first_X_exist
                //action00s_L_after_delete_channel
                history.pushState({}, '', '/'+ window["tagbrain_graph"]["graph00s_c_user"][0]);
                generate_c_graph_c_environment(window["tagbrain_graph"]["graph00s_c_user"][0]); 
            }
        }
    };
    let error_message = "Error: channel is not deleted";
    send_data_ajax(data, url, controller_f, true, error_message);
}