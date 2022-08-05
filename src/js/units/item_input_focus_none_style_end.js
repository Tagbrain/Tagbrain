document.addEventListener('DOMContentLoaded',function(){
    /*document.addEventListener('focus', function(e) {
        e = e || window.event;
        var target_focus_input_item = e.target;
            if (target_focus_input_item.classList.contains("item_input") == true){
                target_focus_input_item.blur()
        }
    }, true)*/
    /*
    document.addEventListener("dblclick", function(e) {
        e = e || window.event;
        var target_focus_input_item = e.target;
        if (target_focus_input_item.classList.contains("item_input") == true){
            let post_without_style = target_focus_input_item.textContent;
            let clean_spans_pattern = /<(|\/)span[^>]*>/gm;
            post_without_style = post_without_style.replaceAll(clean_spans_pattern, '');
            post_without_style = post_without_style.replaceAll(/<script[^>]*>.*<\/script>/gm, '');
            target_focus_input_item.textContent = post_without_style;
            target_focus_input_item.focus();
        }
    });
    */
})