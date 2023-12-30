import {gEBI, dCE } from "../../units/compress_f.js";
import { turn_L_toggle_L_fullscreen } from "../../units/turn_L_toggle_L_fullscreen";
import { save_L_neuron00s_L_edited } from "../../units/save_L_neuron00s_L_edited";


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
        save_L_neuron00s_L_edited();
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
    if(window["tagbrain_graph"]["checker_collection"]["power_mode"].is_activated == true){
        if(!document.fullscreenElement) {
            turn_L_toggle_L_fullscreen("turn_off");
        }
    }
}



