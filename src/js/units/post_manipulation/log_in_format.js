import {elements} from "./obj_post_edit_f.js";
import {patterns} from "./obj_post_edit_f.js";
import {functions} from "./obj_post_edit_f.js";
import {post_format} from "./add_item.js";

function dCE(element){
    return document.createElement(element);
 }

document.addEventListener('DOMContentLoaded',function(){
    let input_fields = elements.all_posts;
        input_fields.forEach((post) => {
            let paste = post.innerText;
            let html_el = post_format(paste);
            post.innerHTML =  html_el.innerHTML;
            functions.search_format_function(post, []);
        });
});

