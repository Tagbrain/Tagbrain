async function send_data_ajax(data, url, controller_f, URLencode, error_message){
    let json;
    if(data != null){
        if(URLencode == false || undefined){
            json = JSON.stringify(data);
        } else {
            json = encodeURIComponent((JSON.stringify(data)));
        }
    }

    let head = {
        method: "POST",
        headers:{
             'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
             "Access-Control-Allow-Origin" : "*", 
             "Access-Control-Allow-Credentials" : true 
        }
    };
    if(data != null)
        head["body"] = "data=" + json;

    let response = await fetch(url, head);


     if (response.ok) { 
         controller_f(await response.json());
      } else {
          console.log(error_message);
      }
}

function gEBI(id, parent) {
    return (parent || document).getElementById(id);
}
const form_fields = {
 channel_name:               gEBI("channel_name"),           
 channel_name_validation:    gEBI("channel_name_validation"),
 editors_channel:            gEBI("editors_channel"),
 editors_channel_validation: gEBI("editors_channel_validation"),
 checkbox:                   gEBI("public_checkbox"),
 submit_button:              gEBI("create_channel_button"),
 result_form:                gEBI("result_form_create_channel"),
};

function updatelength(field_input, output_field){
let   field_input_block = form_fields[field_input],
     output_field_block = form_fields[output_field],
   input_current_length = field_input_block.value.length,
          field_max_len = field_input_block.getAttribute('maxlength'),
field_input_block_value = field_input_block.value;

 output_field_block.innerHTML = +input_current_length+"/"+field_max_len;

 if(field_input == "channel_name"){
     let is_error = true;
     if (field_input_block_value.length < 2 || field_input_block_value.length > field_max_len ) {
         is_error = true;
         let textnode = document.createTextNode(" | The field length can be from 2 to "+field_max_len+" characters");
         output_field_block.appendChild(textnode);
     } else if (/[^A-Za-z0-9_]/.test(field_input_block_value) == true){
         is_error = true;
         let textnode = document.createTextNode(" | The field can include letters(EN), numbers(0-9) and (_)");
         output_field_block.appendChild(textnode);
     } else {
         is_error = false;
         let textnode = document.createTextNode("");
         output_field_block.appendChild(textnode);
     }
     if(is_error == true){
         output_field_block.classList.add('wrong');
         output_field_block.classList.remove('correct');
     } else {
         output_field_block.classList.add('correct');
         output_field_block.classList.remove('wrong');
     }
 } else if (field_input == "editors_channel"){
     if (field_input_block_value.length < 2 || field_input_block_value.length > field_max_len ) {
         let textnode = document.createTextNode(" | The field length can be from 2 to "+field_max_len+" characters");
         output_field_block.appendChild(textnode);
         output_field_block.classList.add('wrong');
         output_field_block.classList.remove('correct');
     } else {
         output_field_block.classList.add('correct');
         output_field_block.classList.remove('wrong');
     }

 };
};

function output_result_ajax_create_channel(result_creating, channel_name){
    let result_block = document.createElement("div");
    result_block.innerHTML = result_creating;
    form_fields.result_form.appendChild(result_block);
    const loc = document.location;
    location.replace('https://' + loc.hostname + '/' + channel_name);
}
async function send_new_channel_data(channel_name, editors_channel, is_private){
    let response = await fetch('php/channels_function/add_channel/add_new_channel_exporter.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
    });
    if (response.ok) { 
        let result_creating = await response.text();
        output_result_ajax_create_channel(result_creating, channel_name);
    } else {
        output_result_ajax_create_channel("Ошибка HTTP: " + response.status);
    }
}

function validation_controller(){
let field_form_elements = ["channel_name", "editors_channel"];
    field_form_elements.forEach(function(field_form_element) {
        let some_field = gEBI(field_form_element);
        some_field.onkeyup = function(){
            updatelength(field_form_element, field_form_element+"_validation"); 
        };
    });
    form_fields.submit_button.addEventListener('click', function(event){
        event.preventDefault();
        if(form_fields.channel_name_validation.classList.contains('correct') && form_fields.editors_channel_validation.classList.contains('correct')){
            let is_private = "private";
            if(form_fields.checkbox.checked == false){
                is_private = "public";
            }
            let data = {
                channel_name: form_fields.channel_name.value,
                editors: form_fields.editors_channel.value,
                private_or_not: is_private
            }
            let url = "php/channels_function/add_channel/add_new_channel_exporter.php";
            let controller_f = function(response_obj){
                if(response_obj.status == "success"){
                        let result_creating = response_obj.response;
                        output_result_ajax_create_channel(result_creating, channel_name);
                } else {
                    output_result_ajax_create_channel("Ошибка HTTP: " + response_obj.status);
                }
            };
            let error_message = "error";
            send_data_ajax(data, url, controller_f, false, error_message);
            return false;
        }  
    });
}

validation_controller();