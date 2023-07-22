type neuron_obj = {
    //obligat
    id: string, 
    words: string,
    type_window:string,
    //facultative
    activation: number | undefined, 
    is_saved:boolean | undefined,
    time: string | undefined, 
    count_c_string_c_og00s: number | undefined,
    tree_c_string: string[] | undefined,
};

export function get_compress_html_set(
    neuron_data:neuron_obj
){
    let controller_output:string;
    let save_index:string;

    if(neuron_data.type_window == "ram"){
        controller_output = "ram_";
        save_index = "history_" + neuron_data.id;
    } else if (neuron_data.type_window == "search"){
        controller_output = "search_";
        save_index = "";
    } else {
        return "Error: there is no type parameter";
    }

    let marker_class: string;
    if(neuron_data.is_saved == false){
        marker_class = "activation_container not_saved_neuron";
    } else {
        marker_class = "activation_container saved_neuron";
    }
    
    let activation: any;
    if(neuron_data.activation == undefined){
        activation = " ";
    } else {
        activation = neuron_data.activation;
    }
    let activation_class: string;
    if(neuron_data.activation == undefined){
        activation_class = "";
    } else {
        activation_class = "special_symbols_style";
    }
    let html = '<div class="search_row" id="'+controller_output+neuron_data.id+'">' 
                + '<div class="link_part">'
                    + '<span class="'+marker_class+'" id="'+save_index+'">'
                        + '<span class="'+activation_class+'" title="Activation">'
                                + activation
                        + '</span>'
                    + '</span>' 
                    + '<span class="header_search_ind special_symbols_style">'
                        + ''
                    + '</span>' 
                    + '<span class="search_row_head_time">'
                        + neuron_data.time 
                    + ' </span>'
                    + '<span class="first_words_search_row">' 
                        + neuron_data.words
                    + '</span>'  
                + '</div>' 
                + '<div class="search_row_body">'
                    + '<span>'
                        + '<span> '
                                + neuron_data.count_c_string_c_og00s
                        + ' </span>'
                        + '<span class="search_toggle toggle_turned_off"> + </span>'
                        + '<span class="toggle_content hide_cl"> [ '
                                + neuron_data.tree_c_string
                        + ']</span>'
                    + '</span>'
                    + '<a class="search_row_delete">✖</a>'
                + '</div>'
            + '</div>';
    return html;
}