type neuron_obj = {
    //obligat
    id: string, 
    time: string | undefined, 
    description_L_short: string,
    type_window:string,
    //facultative
    neuron_L_rank: number | undefined, 
    count_c_string_c_og00s: number | undefined,
    tree_c_string: string | undefined,
    button_L_replace: string
    is_saved:boolean | undefined,
};

export function get_compress_html_set(
    neuron_data: neuron_obj
){

    let marker_class: string;
    if(neuron_data.is_saved == false){
        marker_class = "activation_container not_saved_neuron";
    } else {
        marker_class = "activation_container saved_neuron";
    }
    
    let neuron_L_rank: any;
    if(neuron_data.neuron_L_rank == undefined){
        neuron_L_rank = " ";
    } else {
        neuron_L_rank = neuron_data.neuron_L_rank;
    }
    let activation_class: string;
    if(neuron_data.neuron_L_rank == undefined){
        activation_class = "";
    } else {
        activation_class = "special_symbols_style";
    }

    //take_L_description_L_position
    let description_L_long = "";
    let description_L_short = "";
    if(neuron_data.description_L_short.length > 24){
        description_L_long = neuron_data.description_L_short;
    } else {
        description_L_short = neuron_data.description_L_short;
    }

    let html = '<div class="search_row">' 
                + '<div class="link_part">'
                    + '<span class="'+marker_class+'">'
                        + '<span class="'+activation_class+'" title="Activation">'
                                + neuron_L_rank
                        + '</span>'
                    + '</span>' 
                    + '<span class="header_search_ind">'
                        + description_L_short
                    + '</span>' 
                    + '<span class="search_row_head_time">'
                        + neuron_data.time 
                    + ' </span>'
                    + '<span class="first_words_search_row">' 
                        + description_L_long
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
                    + neuron_data.button_L_replace
                + '</div>'
            + '</div>';
    return html;
}