<?php
session_start();
//return chanel bd access
include "post_template.php";

class load_lists_items{
   public function loadDataFromFile($file, $posts_folder_link){
      $pathway = $posts_folder_link.$file;
      $content_empty_items = 'New post'; 
      if(filesize($pathway) < 1){
         $fh_empty = fopen($pathway, 'w+'); 
         fwrite($fh_empty, $content_empty_items);
         fclose($fh_empty);
      }
      $f = fopen($pathway, "r");
      $post_content = fread($f, filesize ($pathway));
      $post_content = str_replace("\r\n","</br>", $post_content);
      fclose ($f);
      return $post_content;
   }
   use template_post_trait;
}

$class_lists_items = new load_lists_items();

//link on posts folder
if($_POST["page"]){
   $page_address         = $_POST["page"];
   $can_editting_content = $_POST["can_editting"];
   $trim_page=str_replace('.','',$page_address);
   $channel_folder = "";
   if($trim_page != "" && $trim_page != "/"){
      $channel_folder = "../../channels/".$trim_page;
   } else {
      $channel_folder = "../../channels/project";
   }

   $class_lists_items->output_list_posts_variable($channel_folder, $can_editting_content);
   
}




