import { class_L_neuron } from "../classes/class_L_neuron";
import { gEBI } from "./compress_f.js";

export function get_c_draft_c_neuron00s_z_parse_c_neuron00s() {
    let collection_c_neurons_s_c_data = get_c_local_storage_c_neuron00s();
    for (let neuron_features of collection_c_neurons_s_c_data) {
      neuron_features["contenteditable"] = true;
      neuron_features["add_ram_boolen"] = false;
      neuron_features["is_format"] = true;
      neuron_features["is_outgrowth00s"] = true;
      neuron_features["default_tab"] = "draft";
      neuron_features["time_L_last_edit"] = "";
      new class_L_neuron(neuron_features);
    }
  }
  function get_c_local_storage_c_neuron00s() {
    let response: any[] = [];
    let key_s_c_local = Object.keys(localStorage);
    for (var i = 0; i < key_s_c_local.length; i++) {
      if (/neuron_L_draft/.test(key_s_c_local[i])) {
        let reg_id = new RegExp("neuron_L_draft\\[(?<id>[0-9]{10})\\]", "g");
        let arr_c_number: any = key_s_c_local[i].matchAll(reg_id);
        for (let number of arr_c_number) {
          let { id } = number.groups;
          let content: any = localStorage.getItem("neuron_L_draft[" + id + "]");
          response.push({ 
            neuron_id: id, 
            content: JSON.parse(urldecode(content)) 
          });
        }
      }
    }
    return response
  }
  function urldecode(str: string) {
    return decodeURIComponent((str + '').replace(/\+/g, '%20'));
  }