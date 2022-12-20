<?php
session_start();
//return chanel bd access
include "post_template.php";
include "../units/functions/load_neuron_tree.php";

class controller_load_items{
   use load_neuron_tree;
   use template_post_trait;
}

$class_lists_items = new controller_load_items();

//link on posts folder
if($_POST["page"]){
   $page_address         = $_POST["page"];
   $trim_page=str_replace('.','',$page_address);
   $channel_folder = "";
   if($trim_page != "" && $trim_page != "/"){
      $channel_folder = $_SERVER['DOCUMENT_ROOT']."/channels".$trim_page;
   } else {
      $channel_folder = $_SERVER['DOCUMENT_ROOT']."/channels/project";
   }

   $class_lists_items->output_list_posts_variable($channel_folder);
   
}




