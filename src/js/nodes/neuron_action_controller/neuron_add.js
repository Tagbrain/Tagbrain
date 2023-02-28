import {gEBI, dCE} from "../../units/compress_f.js";
import {toggle_pop_up} from '../interface/settings_pop_up_end.js';
let Loader = require('../../units/tehnic/async_loader_end.js');
import {send_data_ajax} from "../../units/send_data_ajax.js";
import {get_selection_neuron_outgrowths} from "../../units/get_selection_neuron_outgrowths";
import {class_c_neuron} from "../../classes/class_c_neuron";

//UNITS
// lv 2

// lv 1

function add_form_for_creating_new_channel(){
   let data = null;
   let url = "php/channels_function/form_add_new_channel.php";
   let controller_f = function(response_obj){
         if(response_obj.status = "success"){
         let neuron_features = {
            neuron_id:"form_new_channel",
            outgrowths: response_obj.content,
            contenteditable: false,
            add_ram_boolen: false,
            is_format: false,
         }
         let neuron_c_new_x_class = new class_c_neuron(neuron_features)
         var l = new Loader();
         l.require([
            "js/validation_send_form_create_channel.js"], 
            function() {
               console.log('Scripts Loaded');
         });
      }
   };
   let error_message = "Search data not load";
   send_data_ajax(data, url, controller_f, true, error_message);
}
function add_new_neuron_from_selection(outgrowths){
   if(gEBI("logout_a")){
      let neuron_features = {
         neuron_id:"",
         outgrowths: outgrowths,
         contenteditable: true,
         add_ram_boolen: true,
         is_format: true,
      }
      let neuron_c_new_x_class = new class_c_neuron(neuron_features);
   }
   let upper_layer_for_animation = document.querySelector(".upper_layer_for_animation"),
   neuron_pop_up_menu = gEBI("neuron_pop_up_menu"),
   classes = neuron_pop_up_menu.classList;
   toggle_pop_up('neuron_pop_up_show', 'neuron_pop_up_hide', classes, upper_layer_for_animation, 'none');
}
//NODE
   //LISTENERS
   //CONTROLLER
   document.addEventListener('DOMContentLoaded',function(){
      if(gEBI("footer_add_neuron_button")){
         gEBI("footer_add_neuron_button").addEventListener('click', function() {
            let outgrowths = [{content: '<div class="post_row">$Write connections of a #new neuron</div>', depth: 0, row: 0}];
            let neuron_features = {
               neuron_id: "",
               outgrowths: outgrowths,
               contenteditable: true,
               add_ram_boolen: true,
               is_format: true,
            }
            let neuron_c_new_x_class = new class_c_neuron(neuron_features)
         });
      };

      if(gEBI("create_new_channel_button")){
         gEBI("create_new_channel_button").addEventListener('click', function() {
            add_form_for_creating_new_channel();
         });
      };
   
      if(gEBI("button_create_from_selection")){
         let data_new_neuron;
         document.addEventListener("contextmenu", (e) => {
            if (window.getSelection()){
               window["tagbrain_graph"]["selection_obj"]["last_outgrowths"] = get_selection_neuron_outgrowths();
            }
         });
         gEBI("button_create_from_selection").addEventListener('click', function(e) {
            add_new_neuron_from_selection(window["tagbrain_graph"]["selection_obj"]["last_outgrowths"]);
         });
      };
   });
