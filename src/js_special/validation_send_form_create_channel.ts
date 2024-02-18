import { generate_L_graph_L_environment } from "../js/nodes/all_posts_action/generate_L_graph_L_environment";
import { gEBI } from "../js/units/compress_f";
import { class_L_controller_L_form } from "./class_L_controller_L_form";

let form_L_field00s = {
    neuron_L_nucleus_L_element: gEBI("form_L_create_L_channel") as Element,
    url_L_request: "php/neurons/controller_L_api.php",
    action_L_request: "add_L_new_L_graph",
    event_L_success_L_response: function(paramater00s: any){
        history.pushState({}, '', '/'+ paramater00s.graph_L_name_X_created);
        generate_L_graph_L_environment(paramater00s.graph_L_name_X_created);
    },
    event_L_failure_L_response: function(paramater00s: any){
        console.log(paramater00s.graph_L_name_X_created + " is not created");
    },
    field00s_L_input: [
        {
            id_L_input: "channel_name",
            input_L_purpose: "Channel name",
            type_L_input: "text",
            output_L_id: "channel_name_validation",
            maxlength: 25,
            minlength: 2,
            regexp_L_checker: new RegExp("[^A-Za-z0-9_]", "iu"),
            regexp_L_uncompatability: " | The field can include letters(A-z), numbers(0-9) and (_)"
        },
        {
            id_L_input: "graph_L_is_private",
            input_L_purpose: "Is private",
            type_L_input: "checkbox",
            output_L_id: "",
            maxlength: 0,
            minlength: 0,
            regexp_L_checker: RegExp(""),
            regexp_L_uncompatability: ""
        },
        {
            id_L_input: "create_channel_button",
            input_L_purpose: "Is private",
            type_L_input: "submit",
            output_L_id: "result_form_create_channel",
            maxlength: 0,
            minlength: 0,
            regexp_L_checker: RegExp(""),
            regexp_L_uncompatability: ""
        }
    ]
}
new class_L_controller_L_form(form_L_field00s);