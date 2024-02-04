import {gEBI, dCE} from "./compress_f.js";
import {parent_is_exist} from "./parent_is_exist";
import {create_objects_outgrowth_from_text} from "./create_objects_outgrowth_from_text";
import { O_isolate_X_get_OL_branch_L_from_L_neuron } from "./O_isolate_X_get_OL_branch_L_from_L_neuron";
import { get_parent_with_class } from "./get_parent_with_class";
import { get_c_collection_c_neuron_s } from "./get_c_collection_c_neuron_s.js";
import { get_c_neuron_c_by_neuron_nucleus_c_og00s } from "./get_c_neuron_c_by_neuron_nucleus_c_og00s";
import { class_formate_c_neuron } from "../classes/class_formate_c_neuron";

export function get_L_og_L_branch_X_current(){

   //get_L_neuron
   let neuron_L_el = window["tagbrain_graph"]["cursor_position"]["neuron_element"],
   outgrowth = window["tagbrain_graph"]["cursor_position"]["outgrowth"],
   neuron_L_id = get_c_neuron_c_by_neuron_nucleus_c_og00s(
      neuron_L_el
   ).neuron_id;
   let node_L_og_L_position = [...neuron_L_el.children].indexOf(outgrowth);
   let class_neuron = new class_formate_c_neuron(
      neuron_L_id, 
      neuron_L_el,
      false
   )

   //get_L_branch
   let branch: any[] = O_isolate_X_get_OL_branch_L_from_L_neuron(
      [node_L_og_L_position],
      class_neuron.outgrowths_c_all
   ).branch00s_L_isolated;

   //return_L_outgrowths 
   return branch[0];
 }