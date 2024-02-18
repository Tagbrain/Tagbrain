import { gEBI, dCE } from "../../units/compress_f.js";
import { send_data_ajax } from "../../units/send_data_ajax.js";
import { class_L_neuron } from "../../classes/class_L_neuron";
import { class_L_graph_L_controller } from "../../classes/class_L_graph_L_controller";
import { get_L_draft_L_neuron00s_z_parse_L_neuron00s } from "../../units/get_L_draft_L_neuron00s_z_parse_L_neuron00s";
import { refresh_L_app_L_environment } from "../../units/refresh_L_app_L_environment";
import { refresh_L_theme } from "../../units/refresh_L_theme";

type graph_feature00s = {
  graph_L_name: string,
  channel_is_private: boolean,
  contenteditable: boolean
}

export function generate_L_graph_L_environment(graph_L_name: string) {
  refresh_L_app_L_environment(graph_L_name);
  get_L_neuron00s_z_parse_L_neuron00s();
  get_L_draft_L_neuron00s_z_parse_L_neuron00s();
  document.title = graph_L_name;
}

function get_L_neuron00s_z_parse_L_neuron00s() {
  let graph_L_name = window["tagbrain_graph"]["graph_name"];
  if(graph_L_name == ""){
    window["tagbrain_graph"]["graph_name"] = "project";
    graph_L_name = "project";
  }
  let data = {
    action: 'get_random_neurons',
    graph_name: graph_L_name,
    facultative: {
      amount: 12,
      search_keys: "empty",
      //neuron_id #remove
    }
  };
  let url = "php/neurons/controller_getting_graph_data.php";
  let controller_f = function (response_obj: any) {
    if (response_obj.status == "success") {
      if (response_obj["data"] != null) {
        parse_L_neuron00s(
          response_obj["data"]["ram"],
          response_obj["contenteditable"],
          true
        );
        parse_L_neuron00s(
          response_obj["data"]["main"],
          response_obj["contenteditable"],
          false
        );
        window["tagbrain_graph"]["neuron00s_L_access"] = response_obj["contenteditable"];

        let public_private_L_element = gEBI("public_private_index");
        if (response_obj["channel_is_private"] == true) {
          public_private_L_element.innerHTML = "private";
        } else {
          public_private_L_element.innerHTML = "public";
        }
        
        //controller_L_theme
        refresh_L_theme(response_obj["graph_L_style00s"]);
 
        gEBI("animation_L_header").innerHTML = response_obj["channel_L_header_L_animation"];
      }

      //clean_L_container_L_graph00s_L_button00s
      window["tagbrain_graph"]["graph00s_L_user"] = [];
      let container_L_graph00s_L_button00s = gEBI("graph00s_L_link00s");
      container_L_graph00s_L_button00s.innerHTML = "";

      if(response_obj["graph00s_L_name00s"] != null){//session_L_exist
        for (let i = 0; i < response_obj["graph00s_L_name00s"].length; i++) {
          let graph_name = response_obj["graph00s_L_name00s"][i];
          new class_L_graph_L_controller(graph_name);
        }
      }

      gEBI("exit_button").click();

    } else {
      console.log("Error 3454");
    }
  };
  let error_message = "Search data not load";
  send_data_ajax(data, url, controller_f, true, error_message);
}

function parse_L_neuron00s(data: any, contenteditable: any, is_in_ram: boolean) {
  for (let i = 0; i < data.length; i++) {
    let neuron_id: string = data[i]["neuron_id"];
    let time: string = data[i]["time_L_last_edit"];
    let content = data[i]["neuron_tree_json"];
    let neuron_features = {
      neuron_id: neuron_id,
      content: content,
      is_outgrowth00s: true,
      contenteditable: contenteditable,
      add_ram_boolen: is_in_ram,
      is_format: true,
      time_L_last_edit: time,
      default_tab: "neurons"
    }
    new class_L_neuron(neuron_features);
  }
}

