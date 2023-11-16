import { gEBI, dCE } from "../../units/compress_f.js";
import { send_data_ajax } from "../../units/send_data_ajax.js";
import { class_L_neuron } from "../../classes/class_L_neuron";
import { class_c_graph_c_controller } from "../../classes/class_c_graph_c_controller";
import { get_c_draft_c_neuron00s_z_parse_c_neuron00s } from "../../units/get_c_draft_c_neuron00s_z_parse_c_neuron00s";
import { refresh_c_app_c_environment } from "../../units/refresh_c_app_c_environment";

type graph_feature00s = {
  graph_c_name: string,
  channel_is_private: boolean,
  contenteditable: boolean
}

export function generate_c_graph_c_environment(graph_c_name: string) {
  refresh_c_app_c_environment(graph_c_name);
  get_c_neuron00s_z_parse_c_neuron00s();
  get_c_draft_c_neuron00s_z_parse_c_neuron00s();
  document.title = graph_c_name;
}

function get_c_neuron00s_z_parse_c_neuron00s() {
  let graph_c_name = window["tagbrain_graph"]["graph_name"];
  if(graph_c_name == ""){
    window["tagbrain_graph"]["graph_name"] = "project";
    graph_c_name = "project";
  }
  let data = {
    action: 'get_random_neurons',
    graph_name: graph_c_name,
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
        parse_c_neuron00s(
          response_obj["data"],
          response_obj["contenteditable"]
        );
        window["tagbrain_graph"]["neuron00s_c_access"] = response_obj["contenteditable"];

        let public_private_c_element = gEBI("public_private_index");
        if (response_obj["channel_is_private"] == true) {
          public_private_c_element.innerHTML = "private";
        } else {
          public_private_c_element.innerHTML = "public";
        }
        
        //controller_c_theme
        let css_c_theme_c_el = gEBI("css_c_theme_a");
        if (css_c_theme_c_el != false) {
          css_c_theme_c_el.remove();
          refresh_c_theme(response_obj["graph_c_style00s"]);
        } else {
          refresh_c_theme(response_obj["graph_c_style00s"]);
        }
        gEBI("animation_c_header").innerHTML = response_obj["channel_c_header_c_animation"];
      }

      //clean_L_container_L_graph00s_L_button00s
      window["tagbrain_graph"]["graph00s_c_user"] = [];
      let container_L_graph00s_L_button00s = gEBI("graph00s_c_link00s");
      container_L_graph00s_L_button00s.innerHTML = "";

      if(response_obj["graph00s_c_name00s"] != null){//session_L_exist
        for (let i = 0; i < response_obj["graph00s_c_name00s"].length; i++) {
          let graph_name = response_obj["graph00s_c_name00s"][i];
          new class_c_graph_c_controller(graph_name);
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
function refresh_c_theme(theme_css: string | false) {
  if(theme_css != false){
    theme_css = atob(theme_css).replace(/#/g, '%23');
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.id = "css_c_theme_a";
    link.href = 'data:text/css,' + theme_css;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.media = 'all';
    head.appendChild(link);
  }
}
function parse_c_neuron00s(data: any, contenteditable: any) {
  for (let i = 0; i < data.length; i++) {
    let neuron_id: string = data[i]["neuron_id"];
    let time: string = data[i]["time_L_last_edit"];
    let content = data[i]["neuron_tree_json"];
    let neuron_features = {
      neuron_id: neuron_id,
      content: content,
      is_outgrowth00s: true,
      contenteditable: contenteditable,
      add_ram_boolen: false,
      is_format: true,
      time_L_last_edit: time,
      default_tab: "neurons"
    }
    new class_L_neuron(neuron_features);
  }
}

