document.addEventListener('DOMContentLoaded',function(){
    let switch_right_bar = document.querySelector("#switch_right_bar"),
        tag_container = document.querySelector(".tag_container"),
        items_container = document.getElementById("items_container");
    switch_right_bar.addEventListener('click', () => {
        if(tag_container.classList.contains("tag_container_off")){
            tag_container.classList.remove('tag_container_off');
            tag_container.classList.add('tag_container_on');
            items_container.classList.remove('items_container_fullscreen');
        } else {
            tag_container.classList.add('tag_container_off');
            tag_container.classList.remove('tag_container_on');
            items_container.classList.add('items_container_fullscreen');
        }
    });

    let scroll_button_bottom = document.querySelector("#scroll_button"),
        items_container_scroll = document.querySelector("#items_container");
    scroll_button_bottom.addEventListener('click', () => {
        let last_item_id =  items_container_scroll.lastElementChild.id;
        window.location.href = "#" + last_item_id;
    });


    document.addEventListener("click", (e) => {
        e = e || window.event;
        var del_button_search_row = e.target;
        if (del_button_search_row.classList.contains("search_row_delete")){
            del_button_search_row.parentNode.parentNode.remove();
        } else if (del_button_search_row.classList.contains("ram_row_delete")){
            del_button_search_row.parentNode.parentNode.remove();
        }
    })

    function contains_parent_with_class(node, class_name, limit_node){
        let iterable_node = node;
        if (iterable_node.nodeType == 3){
             iterable_node = iterable_node.parentNode;
        }

        while(!iterable_node.classList.contains(class_name)){
            iterable_node = iterable_node.parentNode;
           if(iterable_node.classList.contains(class_name))
                return true;
           if(iterable_node == document.body || iterable_node == limit_node)
                break;
        }
        return false;
    }

    let limit_node = document.getElementById("result_block");
    limit_node.addEventListener("click", (e) => {
        e = e || window.event;
        let link_search_row = e.target;
        if (contains_parent_with_class(link_search_row, "link_part", limit_node) === true){
            let current_hash = document.location.hash;
            let href_link = link_search_row.getAttribute("href");
            if(href_link == current_hash && href_link != null){
                true;
            } else {
                if(document.querySelector(".current_post_search_row")){
                    let last_current_post_search_row = document.querySelector(".current_post_search_row");
                    last_current_post_search_row.classList.remove("current_post_search_row");
                }
                let search_row_CL = link_search_row.parentNode.parentNode.classList;
                search_row_CL.add("current_post_search_row");
            }
        }
    })

    function cursor_style_color(){
        let body = document.body;
        let body_style = getComputedStyle(body);
        let main_color = body_style.getPropertyValue('--text-content');
        let shiny_light = body_style.getPropertyValue('--shiny-light');
        let encode_main = main_color.replace('#', '%23');
        let encode_shiny_light = shiny_light.replace('#', '%23');
        let cursor_auto_value = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100' width='100'%3E%3Ccircle cx='8' cy='8' r='5' stroke='`+encode_main+`' stroke-width='1.5' fill='none' /%3E%3C/svg%3E")8 8, auto`;
        let cursor_pointer_value = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100' width='100' %3E%3Ccircle cx='10' cy='10' r='8' stroke='`+encode_shiny_light+`'  stroke-width='1.5' stroke-dasharray='6 3' fill='none' /%3E%3C/svg%3E")12 12, pointer`;
        body.style.setProperty('--cursor-pointer', cursor_pointer_value);
        body.style.setProperty('--cursor-auto', cursor_auto_value);
    }
    cursor_style_color();

    document.addEventListener("dblclick", (e)=>{
        e = e || window.event;
        let tag_element = e.target;
        if(tag_element.classList)
            if(tag_element.classList.contains("item_tags_style"))
                add_click_animation(e);
    });

})

export function remove_click_animation(click_element){
    click_element.remove();
}

export function add_click_animation(e) {
    let circle_cont = document.getElementById("circle_cont");
        
    let click_element = document.createElement("div");
    click_element.classList.add("dot");
    circle_cont.append(click_element);
        
    circle_cont.style.top = (e.clientY-100) + "px";
    circle_cont.style.left = (e.clientX-100) + "px";
    setTimeout(remove_click_animation, 800, click_element);
  }