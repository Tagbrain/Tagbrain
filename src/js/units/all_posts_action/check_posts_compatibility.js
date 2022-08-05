
function call_refractory_timer(timer_name, ms){
    if(timer_name != undefined)
    window.clearTimeout(timer_name);
    timer_name = window.setTimeout(get_not_binded_posts, ms,)
}

let check_content = document.querySelector('#check_content');
let refractory_timer;
check_content.addEventListener('click', () => {
    call_refractory_timer(refractory_timer, 1000);
});

function get_tags_and_boolen_node_exist(some_post, node_tag){

    let post_content = some_post.textContent,
    finded_tags_post = [],
    post_is_node = false;

    post_content.replace(/#[\p{L}_0-9]*/gu, function(search_value){
        if(search_value == node_tag)
            post_is_node = true;
        finded_tags_post.push(search_value);
    });

    return {
        is_node: post_is_node,
        finded_tags_post: finded_tags_post,
    }

}

function get_not_binded_posts(){

    let array_nodes_posts = [],
    array_posts_units = [],
    firsts_words_post,
    results_array = [],
    array_all_nodes_tags = [],
    array_arrays_tags_node_posts = [],
    collection_posts = document.querySelectorAll('#items_container .item_input');
    if(collection_posts != null){
        for(let i = 0; i < collection_posts.length; i++){

            let post_is_node = false;

            let data_post_obj = get_tags_and_boolen_node_exist(collection_posts[i], "#tags_structure");
            post_is_node = data_post_obj.is_node;
            if (post_is_node == true){
                array_nodes_posts.push(collection_posts[i]);
                array_all_nodes_tags = array_all_nodes_tags.concat(data_post_obj.finded_tags_post);
            } else {
                array_posts_units.push(collection_posts[i]);
                continue;
            }        
        }

        //merge with previous function
        let array_unique_all_node_tags = array_all_nodes_tags.filter((item, i, ar) => ar.indexOf(item) === i);
    
        let regexp_all_unique_tags = new RegExp(array_unique_all_node_tags.join('|'), 'g');
        for(let j = 0; j < array_posts_units.length; j++){
            if(regexp_all_unique_tags.test(array_posts_units[j].textContent) == true){
                continue;
            } else {
                firsts_words_post = array_posts_units[j].innerText.split(/([^\p{L}_0-9#]*)/g, 30).join("");
                results_array.push( {
                     id: array_posts_units[j].parentNode.parentNode.id,
                     first_content: firsts_words_post,
                });
            }
        }
    }
    
    //first_text_post
    //posts
    results_array = results_array.map( (post) => {
        return '<a class="search_link" href="#' + post.id + '">'
                    + post.first_content 
                + '</a>';
    });
    document.getElementById("result_block").innerHTML = 
        "<div class='wrong'>" 
            + "These posts are not related to the #tags_structure"
        + "</div>" 
        +"<div class='result_window_padding'>" 
            + results_array.join("<br><br>");
        +"</div>";
    
    array_nodes_posts = array_nodes_posts.map((node)=>{
        firsts_node_words = node.innerText.split(/([^\p{L}_0-9#]*)/g, 30).join("");
        return '<a class="search_link" href="#' + node.id + '">'
                    + firsts_node_words
                + '</a>';
    })
    let join_array_nodes_posts = "<div class='wrong'>Checked nodes lists</div><br>" + array_nodes_posts.join("<br><br>");
    document.getElementById("result_block").innerHTML += join_array_nodes_posts;
}