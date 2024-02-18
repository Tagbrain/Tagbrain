import { gEBI } from "../js/units/compress_f";
import { send_data_ajax } from "../js/units/send_data_ajax";

class class_L_controller_L_form {

    protected id_L_field: string
    protected form_L_element: Element;
    protected url_L_request: string;
    protected action_L_request: string;
    protected event_L_success_L_response: any;
    protected event_L_failure_L_response: any;
    protected field00s_L_input: {
        id_L_input: string,
        input_L_purpose: string,
        type_L_input: string,
        output_L_id: string,
        maxlength: number,
        minlength: number,
        regexp_L_checker: RegExp,
        regexp_L_uncompatability: string
    }[];

    constructor(
        obj00s_L_all_field: {
            neuron_L_nucleus_L_element: Element,
            url_L_request: string,
            action_L_request: string,
            event_L_success_L_response: any,
            event_L_failure_L_response: any,
            field00s_L_input: {
                id_L_input: string,
                input_L_purpose: string,
                type_L_input: string,
                output_L_id: string,
                maxlength: number,
                minlength: number,
                regexp_L_checker: RegExp,
                regexp_L_uncompatability: string
            }[]
        }
    ) {
        this.url_L_request = obj00s_L_all_field.url_L_request;
        this.form_L_element = obj00s_L_all_field.neuron_L_nucleus_L_element;
        this.field00s_L_input = obj00s_L_all_field.field00s_L_input;
        this.action_L_request = obj00s_L_all_field.action_L_request;
        this.validation_controller(
            obj00s_L_all_field.event_L_success_L_response, 
            obj00s_L_all_field.event_L_failure_L_response
        );
    }

   
    validation_controller(event_L_success_L_response:any, event_L_failure_L_response:any) {
        function update_L_field00s_L_state(
            obj:{
                id_L_input: string,
                input_L_purpose: string,
                type_L_input: string,
                output_L_id: string,
                maxlength: number,
                minlength: number,
                regexp_L_checker: RegExp,
                regexp_L_uncompatability: string
            }
        ) {
            let field_L_input_L_el = gEBI(obj.id_L_input),
                element_L_output = gEBI(obj.output_L_id),
                input_L_value = field_L_input_L_el.value,
                input_L_val_L_length = input_L_value.length;
        
            let input_L_size = input_L_val_L_length + "/" + obj.maxlength;
            let textnode = "";
        
            let is_exist_L_error = true;
            if (input_L_val_L_length < obj.minlength || input_L_val_L_length > obj.maxlength) {
                textnode = " | The field length can be from " + obj.minlength + " to " + obj.maxlength + " characters";
            } else if (obj.regexp_L_checker.test(input_L_value) == true) {
                textnode = obj.regexp_L_uncompatability;
            } else {
                is_exist_L_error = false;
                textnode = "";
            }
            
            if (is_exist_L_error == true) {
                element_L_output.classList.add('wrong');
                element_L_output.classList.remove('correct');
            } else {
                element_L_output.classList.add('correct');
                element_L_output.classList.remove('wrong');
            }
            
        
            element_L_output.innerHTML = input_L_size + textnode;
        
        };
        for (let i = 0; i < this.field00s_L_input.length; i++) {
            let field_L_input_L_obj = this.field00s_L_input[i];
    
            if (field_L_input_L_obj.type_L_input == "text") {
                let holder_f:any = function(){
                    update_L_field00s_L_state(field_L_input_L_obj);
                }
                
                gEBI(field_L_input_L_obj.id_L_input).onkeyup = function () {
                    holder_f();
                }
            } else if (field_L_input_L_obj.type_L_input == "checkbox") {
    
            } else if (field_L_input_L_obj.type_L_input == "submit") {
                let form_L_element = this.form_L_element;
                let field00s_L_input = this.field00s_L_input;
                let url_L_request = this.url_L_request;
                let action_L_request = this.action_L_request;
                
                gEBI(field_L_input_L_obj.id_L_input).addEventListener(
                    'click', 
                    function (event: any) {
                        event.preventDefault();
                        if (form_L_element.querySelector(".wrong") == null) {
                            function get_L_form_L_data(
                                field00s_L_input: {
                                    id_L_input: string,
                                    input_L_purpose: string,
                                    type_L_input: string,
                                    output_L_id: string,
                                    maxlength: number,
                                    minlength: number,
                                    regexp_L_checker: RegExp,
                                    regexp_L_uncompatability: string
                                }[]
                            ){
                                let data = {};
                            
                                for (let i = 0; i < field00s_L_input.length; i++) {
                                    let field_L_input_L_obj = field00s_L_input[i];
                            
                                    if (field_L_input_L_obj.type_L_input == "text") {
                            
                                        let key = field_L_input_L_obj.id_L_input;
                                        let value = gEBI(field_L_input_L_obj.id_L_input).value;
                            
                                        data[key] = value;
                            
                                    } else if (field_L_input_L_obj.type_L_input == "checkbox") {
                            
                                        let key = field_L_input_L_obj.id_L_input;   
                                        let value = false;
                                        if (gEBI(field_L_input_L_obj.id_L_input).checked == true) {
                                            value = true;
                                        } else {
                                            value = false;
                                        }
                                        
                                        data[key] = value;
                                    }
                            
                                }
                            
                                return data;
                            }
                            
                            let data: any = get_L_form_L_data(field00s_L_input);

                            data["action"] = action_L_request;
                            let controller_f = function (response_obj: any) {
                                if (response_obj.status == "success") {
                                    let params: any = response_obj.response_L_parameter;
                                    event_L_success_L_response(params);
                                } else {
                                    let params: any = response_obj.response_L_parameter;
                                    event_L_failure_L_response(params);
                                }
                            };
                            let error_message = "error";
                            send_data_ajax(data, url_L_request, controller_f, true, error_message);
                            return false;
                        }
                    }
                );
            }
        }
    }

  
}
export {class_L_controller_L_form};