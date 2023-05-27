import { gEBI, dCE } from "../../units/compress_f.js";
import { send_data_ajax } from "../../units/send_data_ajax.js";
import { class_c_neuron } from "../../classes/class_c_neuron";

export function generate_random_neuron_image() {
  send_c_request_c_get_c_neuron_s();
  send_c_request_c_get_c_neuron_s_c_draft_x_draft();
}

function send_c_request_c_get_c_neuron_s() {
  let data = {
    action: 'get_random_neurons',
    graph_name: window["tagbrain_graph"]["graph_name"],
    facultative: {
      amount: 20,
      search_keys: "empty",
      //neuron_id #remove
    }
  };
  let url = "php/neurons/controller_getting_graph_data.php";
  let controller_f = function (response_obj: any) {
    if (response_obj.status == "success") {

      if (response_obj["data"] != null) {
        parse_neuron(response_obj["data"], response_obj["contenteditable"]);
        if (gEBI("loading_flag_random_neurons") != false) {
          gEBI("loading_flag_random_neurons").remove();
        }
      }

    } else {
      console.log("Error 3454");
    }
  };
  let error_message = "Search data not load";
  send_data_ajax(data, url, controller_f, true, error_message);
}
function send_c_request_c_get_c_neuron_s_c_draft_x_draft() {
  let collection_c_neurons_s_c_data = get_c_local_storage_c_neuron_s();
  for (let neuron_features of collection_c_neurons_s_c_data) {
    neuron_features["contenteditable"] = true;
    neuron_features["add_ram_boolen"] = false;
    neuron_features["is_format"] = false;
    neuron_features["default_tab"] = "draft";
    new class_c_neuron(neuron_features);
  }
  if (gEBI("loading_flag_cookies_neurons") != false) {
    gEBI("loading_flag_cookies_neurons").remove();
  }
}
function get_c_local_storage_c_neuron_s() {
  let response: any[] = [];
  let key_s_c_local = Object.keys(localStorage);
  for (var i = 0; i < key_s_c_local.length; i++) {
    if (/neuron_c_dr/.test(key_s_c_local[i])) {
      let reg_id = new RegExp("neuron_c_dr\\[(?<id>[0-9]{10})\\]", "g");
      let arr_c_number: any = key_s_c_local[i].matchAll(reg_id);
      for (let number of arr_c_number) {
        let { id } = number.groups;
        let content: any = localStorage.getItem("neuron_c_dr[" + id + "]");
        response.push({ neuron_id: id, outgrowths: JSON.parse(urldecode(content)) });
      }
    }
  }
  return response
}
function urldecode(str: string) {
  return decodeURIComponent((str + '').replace(/\+/g, '%20'));
}

function parse_neuron(data: any, contenteditable: any) {
  for (let i = 0; i < data.length; i++) {
    let neuron_id: string = data[i]["neuron_id"];
    let time: string = data[i]["time_last_change"];
    let content = data[i]["neuron_tree_json"];
    let neuron_features = {
      neuron_id: neuron_id,
      outgrowths: content,
      contenteditable: contenteditable,
      add_ram_boolen: false,
      is_format: true,
    }
    new class_c_neuron(neuron_features);
  }

}