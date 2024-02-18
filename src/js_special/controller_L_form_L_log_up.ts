import { generate_L_graph_L_environment } from "../js/nodes/all_posts_action/generate_L_graph_L_environment";
import { gEBI } from "../js/units/compress_f";
import { class_L_controller_L_form } from "./class_L_controller_L_form";

let form_L_field00s = {
    neuron_L_nucleus_L_element: gEBI("form_L_create_L_new_user") as Element,
    url_L_request: "php/neurons/controller_L_api.php",
    action_L_request: "add_L_user_L_new",
    event_L_success_L_response: function(parameter00s: any){
        alert("User '" + parameter00s.user_L_name_X_new + "' is created. Use the setting button to log in to your account.");
        //special action not need
    },
    event_L_failure_L_response: function(parameter00s: any){
        console.log("User '" + parameter00s.user_L_name_X_new + "' is not created. Error")
        //special action not need
    },
    field00s_L_input: [
        {
            id_L_input: "user_L_name_X_new",
            input_L_purpose: "User name",
            type_L_input: "text",
            output_L_id: "user_L_name_X_new_X_validation",
            maxlength: 25,
            minlength: 2,
            regexp_L_checker: new RegExp("[^A-Za-z0-9_]", "iu"),
            regexp_L_uncompatability: " | The field can include letters(A-z), numbers(0-9) and (_)"
        },
        {
            id_L_input: "user_L_password_X_new",
            input_L_purpose: "Password",
            type_L_input: "text",
            output_L_id: "user_L_password_X_new_L_validation",
            maxlength: 25,
            minlength: 2,
            regexp_L_checker: new RegExp("[^A-Za-z0-9_]", "iu"),
            regexp_L_uncompatability: " | The field can include letters(A-z), numbers(0-9) and (_)"
        },
        {
            id_L_input: "user_L_email_X_new",
            input_L_purpose: "email",
            type_L_input: "text",
            output_L_id: "user_L_email_L_validation_Z_new",
            maxlength: 45,
            minlength: 10,
            regexp_L_checker: new RegExp("^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$", "gm"),
            regexp_L_uncompatability: " | Format: your_email_name@server_domen.com"
        },
        {
            id_L_input: "form_L_button_L_create_L_new_user",
            input_L_purpose: "",
            type_L_input: "submit",
            output_L_id: "form_L_field_L_result",
            maxlength: 0,
            minlength: 0,
            regexp_L_checker: RegExp(""),
            regexp_L_uncompatability: ""
        }
    ]
}
new class_L_controller_L_form(form_L_field00s);