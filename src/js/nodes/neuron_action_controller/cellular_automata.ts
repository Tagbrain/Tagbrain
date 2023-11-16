import {gEBI, dCE } from "../../units/compress_f.js";
import { send_c_change_request_x_target_c_server } from "../../units/send_c_change_request_x_target_c_server";
import { send_c_change_request_x_target_c_local_storage } from "../../units/send_c_change_request_x_target_c_local_storage";
import { class_formate_c_neuron } from "../../classes/class_formate_c_neuron";


setInterval(function(){ 
    refresh_automate();
}, 9000);


//if zero
//if one
//function change_one(lenght: number, current_position: number){}

function getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
document.addEventListener('keydown', function(event) {
    if(event.ctrlKey == true && event.keyCode == 83) {
        event.preventDefault();
        //unfocus_c_neuron00s
        gEBI("layoutViewport").click();
        save_edited_neurons();
    }
  });

function refresh_automate(){
    let cellular_automata: HTMLElement = gEBI("cellural_automaton");
    let random_int = getRandomInt(100000000, 999999999);
    let str_number = random_int.toString();
    let str_boolean = "";
    for(let i = 0; i < Array.from(str_number).length; i++){
        let num = parseInt(Array.from(str_number)[i], 10);
        if(num > 4){
            str_boolean += str_boolean + "■ ";
        } else if(num < 5) {
            str_boolean += str_boolean + "  ";
        }
    }

    let part1 = str_boolean.substr(0, 6);
    let part2 = str_boolean.substr(6, 6);
    let part3 = str_boolean.substr(12, 6);

    cellular_automata.innerHTML = '<tspan x="580">'+part1+'</tspan>'+'<tspan x="580" dy="15">'+part2+'</tspan>'+'<tspan x="580" dy="15">'+part3+'</tspan>';
    save_edited_neurons();
}

function save_edited_neurons(){
    let collection_neurons_c_obj = window["tagbrain_graph"]["neuron00s_obj00s"];
    
    for (var id in collection_neurons_c_obj) {
        let obj = collection_neurons_c_obj[id];
        if(obj.neuron_is_saved == false){
            if(obj.neuron_el != document.activeElement){

                let array_current_key_word = obj.neuron_el.querySelectorAll("mark");

                if(obj.tab_L_neuron == "neurons"){
                    send_c_change_request_x_target_c_server(
                        obj.neuron_el, 
                        obj.neuron_id, 
                        obj.neuron_shell
                    );
                } else if(obj.tab_L_neuron == "draft") {
                    let options = {
                        neuron_el: obj.neuron_el,
                        neuron_id: obj.neuron_id,
                        neuron_shell: obj.neuron_shell,
                    }
                    send_c_change_request_x_target_c_local_storage(options);
                }
                if (array_current_key_word.length == 0) {
                    new class_formate_c_neuron(
                        obj.neuron_id, 
                        "",
                        false
                    );
                } else {
                    let arr_text_val: any = [];
                    for (var i = 0; i < array_current_key_word.length; i++) {
                        arr_text_val.push(array_current_key_word[i].innerText.trim());
                    }
                    new class_formate_c_neuron(
                        obj.neuron_id, 
                        arr_text_val.join("|"),
                        false
                    );
                }
            }
        }
        document.title = document.title = window["tagbrain_graph"]["graph_name"];
    }
}

