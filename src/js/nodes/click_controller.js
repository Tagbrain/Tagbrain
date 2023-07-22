document.addEventListener('DOMContentLoaded',function(){

    document.addEventListener("click", (e) => {
        e = e || window.event;
        var targetEl = e.target;
        let targetEl_cl = targetEl.classList
        if (targetEl_cl.contains("search_toggle")){
            if(targetEl_cl.contains("toggle_turned_on")){
                targetEl_cl.remove("toggle_turned_on");
                targetEl_cl.add("toggle_turned_off");
                let toggle_content = targetEl.parentNode.querySelector(".toggle_content");
                toggle_content.classList.remove("show_cl");
                toggle_content.classList.add("hide_cl");
            } else if(targetEl_cl.contains("toggle_turned_off")){
                targetEl_cl.remove("toggle_turned_off");
                targetEl_cl.add("toggle_turned_on");  
                let toggle_content = targetEl.parentNode.querySelector(".toggle_content");
                toggle_content.classList.add("show_cl");
                toggle_content.classList.remove("hide_cl");
            }
        }

    })

})