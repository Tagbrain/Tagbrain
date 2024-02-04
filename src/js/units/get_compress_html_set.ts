import { get_c_neuron00s_id00s_x_ram } from "./get_c_neuron00s_id00s_x_ram";

type neuron_obj = {
    //obligat
    id: string, 
    time: string | undefined, 
    description_L_short: string,
    type_window:string,
    neuron_L_rank: number | undefined, 
    count_c_string_c_og00s: number | undefined,
    tree_c_string: string | undefined,
    button_L_replace: string
    is_saved:boolean | undefined,
    tab_L_unit_X_name: string,
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


    let ram_L_id00s = get_c_neuron00s_id00s_x_ram();
    let qr_code = '';
    if(ram_L_id00s.includes(neuron_data.id) || neuron_data.type_window == "ram"){
        //generate_L_neuron_L_qr
        let number_L_for_qr = neuron_data.id.substring(1, 11);
        let number00s_L_for_qr = number_L_for_qr.split('');
        
        for (let i = 0; i < number00s_L_for_qr.length; i++) {
            let num_L_for_qr = Number(number00s_L_for_qr[i]);
            if(num_L_for_qr > 7){
                qr_code += '<sq>●</sq>'
            } else if(num_L_for_qr == 7){
                qr_code += '<sq>|</sq>'
            } else if(num_L_for_qr == 6){
                qr_code += '<sq>●</sq>'
            } else if(num_L_for_qr == 1 || num_L_for_qr == 5){
                qr_code += '<sq>◇</sq>'
            } else {
                qr_code += '<sq>─</sq>'
            }
        }
    }

    //take_L_description_L_position
    let description_L_short = neuron_data.description_L_short;

    let html = '<div class="search_row">' 
                + '<div class="link_part">'
                    + '<span class="'+marker_class+'">'
                        + '<span class="'+activation_class+'" title="Activation">'
                                + neuron_L_rank
                        + '</span>'
                    + '</span>' 
                    + '<span class="ram_L_qr_code">'
                        + qr_code
                    + '</span>' 
                    + '<span class="header_search_ind">'
                        + "+" //neuron_data.tab_L_unit_X_name
                    + '</span>' 
                    + '<span class="search_row_head_time">'
                        + neuron_data.time 
                    + ' </span>'
                    + '<span class="first_words_search_row">' 
                        + description_L_short
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