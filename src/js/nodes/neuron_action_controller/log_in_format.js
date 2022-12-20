import {elements} from "./obj_post_edit_f";
import {patterns} from "./obj_post_edit_f";
import {functions} from "./obj_post_edit_f";
import {post_format} from "../../units/formate_neuron";

function dCE(element){
    return document.createElement(element);
 }

document.addEventListener('DOMContentLoaded',function(){
    let input_fields = elements.all_posts;
        input_fields.forEach((post) => {
            let paste = post.innerText;
            let html_divs = post_format(paste);
            post.innerHTML =  html_divs.innerHTML;
            functions.search_format_function(post, []);
        });
});

