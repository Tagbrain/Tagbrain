<?php
session_start();
include "../protect/server_protect.php";

class change_post {

    use session_protect;

    protected function change_item_content($file, $content_changed_item){
        if(file_exists($file)){
            file_put_contents($file, $content_changed_item);
            $unix_timestamp = filemtime($file);
            $file_time = date("d|m|Y|H:i:s", $unix_timestamp);
            return $file_time;
        } else {
            echo "post not exist";
        }
    }

    protected function put_history_changing_row($channel_name, $user, $item_id, $file_time){
        $post_changing_statistic = __DIR__ . "/../../channels/".$channel_name."/last_changing";
        $new_row = $user.",".$item_id.",".$file_time."\n";
        if(!file_exists($post_changing_statistic.'.csv')){
            file_put_contents($post_changing_statistic.'.csv', $new_row ,FILE_APPEND);
        }
        $writing = fopen($post_changing_statistic.'.tmp', 'w');
        $reading = fopen($post_changing_statistic.'.csv', 'r');
        $i = 0;
        $replaced = false;

        while (!feof($reading)) {
            $line = fgets($reading);
            if ($i == 0) {
                $line = $new_row.$line;
                $replaced = true;
            }
            if($i > 100){
                $line = ''; 
            }
            fputs($writing, $line);
            $i++;
        }
        fclose($reading); fclose($writing);

        // if we didn't replace anything
        if ($replaced) {
            rename($post_changing_statistic.'.tmp', $post_changing_statistic.'.csv');
        } else {
            unlink($post_changing_statistic.'.tmp');
        }

        //$new_row = $user.",".$item_id.",".$file_time."\n";
        //file_put_contents("$post_changing_statistic", $new_row ,FILE_APPEND);

    }

    public function get_and_check_data($channel_name, $new_content, $item_id){

        $can_editing = $this->check_session_data($_SESSION["userid"],$_SESSION["all_member_channels"], $_SESSION["editor"],$_SESSION["creator"], $channel_name);

        if($can_editing == true){

            $dir_content_items = __DIR__ . "/../../channels/".$channel_name."/content_items/";
            $name_item = $item_id.".php";
            $link_content = $dir_content_items.$name_item;
            $file_time = $this->change_item_content($link_content, $new_content);
            $this->put_history_changing_row($channel_name,$_SESSION["userid"], $item_id, $file_time);

        } else {
            echo "No access";
        }

    }
    
}

//definition
$item_id = htmlspecialchars_decode($_POST['parent_item_id']);
$new_content = htmlspecialchars_decode($_POST['new_content']);
$channel_name = $_POST['channel_folder'];

if(isset($item_id, $new_content, $channel_name)){
    $change_post = new change_post();
    $change_post->get_and_check_data($channel_name, $new_content, $item_id);
    echo "save";
} else {
    echo "Data is not complete";
}
