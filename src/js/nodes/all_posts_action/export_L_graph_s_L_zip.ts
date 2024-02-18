import { fetch_L_get_L_file } from "../../units/fetch_L_get_L_file";

export function export_L_graph_s_L_zip(){
    let data = {
        action: 'export_L_graph_s_L_me',
        is_export_all: true,
        graph_name: window["tagbrain_graph"]["graph_name"],
    };
    let url = "php/neurons/controller_download_graph.php";
    let controller_f = function (response_obj: any) {
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(response_obj);
        let unix_time:string = Math.round(new Date().getTime() / 1000).toString();
        a.download = "my_graph_s_"+unix_time+".zip";
        a.click(); 
    }
    let error_message = "Error 17678484";
    fetch_L_get_L_file(data, url, controller_f, true, error_message);
}