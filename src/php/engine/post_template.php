<?php

trait template_post_trait{

    public function output_list_posts_variable($channel_folder, $can_editting_content){
        echo '<link rel="stylesheet" href="'.$channel_folder.'/css/theme.css'.'">';
        $posts_folder_link = $channel_folder."/content_items/";
        try {
            $files = array_diff(scandir($posts_folder_link), array('..', '.'));
            foreach($files as $folder_file){
               if($folder_file){
                  $file_path = $posts_folder_link.$folder_file;
                  $unix_timestamp = filemtime($file_path);
                  $file_time = date("d|m|Y", $unix_timestamp);
                  $file_id = substr($folder_file, 0, strrpos($folder_file, '.'));
               }
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
  
                 echo $this->loadDataFromFile($folder_file, $posts_folder_link);
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
        } catch (Exception $e){
  
        };
    }


}