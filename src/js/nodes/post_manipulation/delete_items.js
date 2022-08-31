document.addEventListener('DOMContentLoaded',function(){

    function data_send_to_remove_post(item_id, channel_folder){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == XMLHttpRequest.DONE) {
               if (xhttp.status == 200) {
                   console.log(xhttp.responseText);
               } else if (xhttp.status == 400) {
                   console.log('There was an error 400');
               } else {
                   console.log('something else other than 200 was returned');
               }
            }
         };
         xhttp.open("POST", "php/post/remove_post.php", true);
         xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
         xhttp.send("item_id=" + item_id + "&channel_folder="+ channel_folder);
    };

    document.addEventListener("click", function(e) {
        e = e || window.event;
        var delete_button_block = e.target;
        let post_node;
        if (delete_button_block.classList.contains("delete_item_button") == true){
            let remove_or_not = confirm("Do you want to delete the item?");
            if (remove_or_not == true){
                try{
                    let channel_folder = document.getElementById("page_tag_map_name").textContent.trim();
                    data_send_to_remove_post(delete_button_block.parentNode.id, channel_folder);
                    delete_button_block.parentNode.parentNode.removeChild(delete_button_block.parentNode); 
                } catch (err){
                    console.log("item won't remove<br><br>" + err);
                }
            }
        }
    });
    
});