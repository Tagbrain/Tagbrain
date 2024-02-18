import { class_L_controller_L_tabs_functions } from "../classes/class_L_controller_L_tabs_functions";
import { upload_L_tabs_L_environment } from "../nodes/all_posts_action/controller_tabs";
import {tagbrain_graph} from "../nodes/tagbrain_graph";
import { gEBI } from "./compress_f";
export function duplicate_L_graph_L_object(){
    let feature00s_L_clone00s = ["checker_collection"];

    let keys_L_graph_L_current = Object.keys(tagbrain_graph);
    let tagbrain_graph_L_new = {};
    for (let i = 0; i < keys_L_graph_L_current.length; i++) {
        tagbrain_graph_L_new[keys_L_graph_L_current[i]] = tagbrain_graph[keys_L_graph_L_current[i]];
    }
    for (let i = 0; i < feature00s_L_clone00s.length; i++) {
        tagbrain_graph_L_new[feature00s_L_clone00s[i]] = tagbrain_graph[feature00s_L_clone00s[i]];
    }
    window["tagbrain_graph"] = tagbrain_graph_L_new;
    upload_L_tabs_L_environment();

    gEBI("page_tag_map_name").innerHTML = document.location.pathname.split("/")[1];
}