import {class_c_controller_c_tabs_functions} from "../../classes/class_c_controller_c_tabs_functions";

let tabs_array = [
    {
        name: "neurons", 
        default: true,
        content_html: '<div class="loading_c_flag"></div>',
    },
    {
        name: "draft", 
        default: true,
        content_html: '<div class="loading_c_flag"></div>',
    },
]

for(let i = 0; i < tabs_array.length; i++){
    let tab_features = tabs_array[i];
    let tab_class = new class_c_controller_c_tabs_functions(
        tab_features["name"], 
        tab_features["default"], 
        tab_features["content_html"]
    );
    tabs_array[i]["class"] = tab_class;
}
window["tagbrain_graph"]["tab_collection"]["neurons"].open_tab();



