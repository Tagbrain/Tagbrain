import {tagbrain_graph} from "../nodes/tagbrain_graph";
import { gEBI } from "./compress_f";
export function duplicate_c_graph_c_object(){
    let feature00s_c_clone00s = ["checker_collection"];

    let keys_c_graph_c_current = Object.keys(tagbrain_graph);
    let tagbrain_graph_c_new = {};
    for (let i = 0; i < keys_c_graph_c_current.length; i++) {
        tagbrain_graph_c_new[keys_c_graph_c_current[i]] = tagbrain_graph[keys_c_graph_c_current[i]];
    }
    for (let i = 0; i < feature00s_c_clone00s.length; i++) {
        tagbrain_graph_c_new[feature00s_c_clone00s[i]] = tagbrain_graph[feature00s_c_clone00s[i]];
    }
    window["tagbrain_graph"] = tagbrain_graph_c_new;

    gEBI("page_tag_map_name").innerHTML = document.location.pathname.split("/")[1];
}