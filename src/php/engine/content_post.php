<?php
session_start();
//return chanel bd access
include "post_template.php";
include "load_post_content.php";

class controller_load_items{
   use load_post_content;
   use template_post_trait;
}

$class_lists_items = new controller_load_items();

//link on posts folder
if($_POST["page"]){
   $page_address         = $_POST["page"];
   $can_editing_content = $_POST["can_editing"];
   $trim_page=str_replace('.','',$page_address);
   $channel_folder = "";
   if($trim_page != "" && $trim_page != "/"){
      $channel_folder = "../../channels/".$trim_page;
   } else {
      $channel_folder = "../../channels/project";
   }

   $class_lists_items->output_list_posts_variable($channel_folder, $can_editing_content);
   
}




