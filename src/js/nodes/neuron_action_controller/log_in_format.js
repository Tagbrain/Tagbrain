import {elements} from "./obj_post_edit_f";
import {post_format} from "../../units/formate_neuron";
import {find_formate_neuron} from "../../units/find_formate_neuron";

function dCE(element){
    return document.createElement(element);
 }

document.addEventListener('DOMContentLoaded',function(){
    let input_fields = elements.all_posts;
        input_fields.forEach((post) => {
            let paste = post.innerText;
            let html_divs = post_format(paste);
            post.innerHTML =  html_divs.innerHTML;
            find_formate_neuron(post, []);
        });
});

