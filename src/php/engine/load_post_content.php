<?php

trait load_post_content{

   public function loadDataFromFile($file){
      $pathway = $file;
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
}