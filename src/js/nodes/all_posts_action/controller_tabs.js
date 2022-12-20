import {tab_main_container} from "../../classes/tab_main_container";

function create_tab_class(tab_object){
    let tab_class = new tab_main_container(tab_object["name"], tab_object["default"]);
    return tab_class;
}

let tabs_array = [
    {name: "Neurons", default: true},
    {name: "Draft", default: false},
]

for(let i = 0; i < tabs_array.length; i++){
    let tab_class = create_tab_class(tabs_array[i]);
    tabs_array[i]["class"] = tab_class;
    tabs_array[i]["class"].add_tab();
}



