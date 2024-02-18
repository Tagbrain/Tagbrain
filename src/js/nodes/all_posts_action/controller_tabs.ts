import {class_L_controller_L_tabs_functions} from "../../classes/class_L_controller_L_tabs_functions";

export function upload_L_tabs_L_environment(){
    let tabs_array = [
        {
            name: "neurons", 
            default: true,
            content_html: '<div class="loading_L_flag"></div>',
        },
        {
            name: "draft", 
            default: true,
            content_html: '<div class="loading_L_flag"></div>',
        },
    ]

    for(let i = 0; i < tabs_array.length; i++){
        let tab_features = tabs_array[i];
        new class_L_controller_L_tabs_functions(tab_features);
    }
    window["tagbrain_graph"]["tab_collection"]["neurons"].open_tab();
}


