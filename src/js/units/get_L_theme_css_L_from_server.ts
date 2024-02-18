import { refresh_L_theme } from "./refresh_L_theme";
import { refresh_L_app_L_environment } from "./refresh_L_app_L_environment";
import { send_data_ajax } from "./send_data_ajax";
import { set_L_cursor_L_style00s } from "./set_L_cursor_L_style00s";

export function get_L_theme_css_L_from_server(theme_L_name:string){
    let graph_L_name = window["tagbrain_graph"]["graph_name"];
    let data = {
        action: 'load_L_theme_css',
        theme_L_name: theme_L_name,
        graph_L_name: graph_L_name,
    };
    let url = "php/neurons/controller_L_api.php";
    let controller_f = function(response_obj: any){
        if(response_obj.status == "success"){
            refresh_L_theme(response_obj["theme_L_css"]);
            set_L_cursor_L_style00s();
        }
    };
    let error_message = "Search data not load";
    send_data_ajax(data, url, controller_f, true, error_message);     
}