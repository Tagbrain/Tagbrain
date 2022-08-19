<?php

trait template_post_trait{

   function get_post_html($can_editting_content, $file_id, $file_time, $content){
      if ($can_editting_content == true) {
         echo
         '<div class="item" id="' . $file_id .'">'.
            '<div class="post_name">
               <span>Post:'.$file_id.'</span>
               <span class="save_flag"></span>
               <span class="file_time" title="last_editing">'.$file_time.'</span>
            </div>'.
            '<a class="delete_item_button button_cont_stl">'.
               '<svg class="fill_icon_style icon_size_middle"><use xlink:href="#sprite_delete_button"></use></svg>'.
            '</a>'.
            '<div class="sense_item">'.
               '<div class="numbers_bar"></div>'.
              '<div contenteditable="true" spellcheck="false" id='.'"'.'item_input_id_'.$file_id.'"'.' class="item_input">';
      } else {
         echo
         '<div class="item" id='.'"'.$file_id.'"'.'>'.
         '<div class="post_name">
            <span>Post:'.$file_id.'</span>
            <span class="save_flag"></span>
            <span class="file_time" title="last_editing">'.$file_time.'</span>
         </div>'.
         '<div class="sense_item">'.
           '<div id='.'"'.'item_input_id_'.$file_id.'"'.' class="item_input">';
     };
     try {

        echo $content;
     } catch (Exception $e) {
        echo $e->getMessage();
     };
     echo
           '</div>'.
           '<div class="post_low_panel">'.
              '<span class="count_words post_counters" title="Words count | MAX: 500">'.
                 'W:'.
              '</span>'.
              '<span class="count_rows post_counters" title="Rows count">'.
                 'R:'.
              '</span>'.
              '<span class="count_tags post_counters" title="Tags count">'.
                 '#:'.
              '</span>'.
              '<span class="count_points post_counters" title="Points counts quality of the post">'.
              '</span>'.
           '</div>'.
        '</div>'.
     '</div>';
   }

   public function output_list_posts_variable($channel_folder, $can_editting_content){
        echo '<link rel="stylesheet" href="'.$channel_folder.'/css/theme.css'.'">';
        $posts_folder_link = $channel_folder."/content_items/";
      try {
            $files = array_diff(scandir($posts_folder_link), array('..', '.'));
            
            $counter_limit = 0;
            $unit_arr = array(); 
            $node_arr = array();
            $sort_files = array();
            $nodes = array();

            foreach($files as $file){

               if(count($node_arr) > 20){
                  break;
               }

               $file_path = $posts_folder_link.$file;
               $unix_timestamp = filemtime($file_path);
                  $file_time = date("d|m|Y", $unix_timestamp);
               $file_id = substr($file, 0, strrpos($file, '.'));

               $content = $this->loadDataFromFile($file_path);
               $node = "#tags_structure";
               $is_node = false;
               
               //check_node
               $reading = fopen($file_path, 'r');
               while(!feof($reading)){
                  $line = fgets($reading);
                      
                  $regexp = '/'.$node.'/i';
                  if(preg_match($regexp,$line,$match) != false){
                     $is_node = true;
                     break;
                  }
               }
               fclose($reading);

               if($is_node == true){
                  $arr = array(
                     "content" => $content,
                     "file" => $file,
                     "time" => $file_time,
                     "id" => $file_id
                  );
                  array_push($node_arr, $arr);  
               } else {
                  $arr = array(
                     "content" => $content,
                     "file" => $file,
                     "time" => $file_time,
                     "id" => $file_id
                  );
                  array_push($unit_arr, $arr);
               };

            }

            if(count($node_arr) >= 20){
               foreach($node_arr as $node){
                  $this->get_post_html($can_editting_content, $node["id"], $node["time"], $node["content"]);
               }
            } else {
               $usual_posts_count = 20 - count($node_arr);
               array_splice($unit_arr, $usual_posts_count);
               foreach($node_arr as $node){
                  $counter_limit++;
                  $this->get_post_html($can_editting_content, $node["id"], $node["time"], $node["content"]);
               }
               foreach($unit_arr as $node){
                  if($counter_limit > 20){
                     break;
                  }
                  $this->get_post_html($can_editting_content, $node["id"], $node["time"], $node["content"]);
                  $counter_limit++;
               }
            }
        } catch (Exception $e){
  
      };
   }


}
