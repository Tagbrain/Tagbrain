<?php
session_start();

$content_new_items = $_POST['new_item'];
$channel_name = $_POST['channel_folder'];

if(isset($channel_name) == true){
    foreach($_SESSION["all_member_channels"] as $user_channel){
        if($user_channel == $channel_name){
            $channel_change_valid = true;
            break;
        } else {
            $channel_change_valid = false; 
        };
    }
    try {
        if ($channel_change_valid == true){
            $dir_content_items = __DIR__ . "/../../channels/".$channel_name."/content_items/";
            $number_file = time();
            $name_new_item = $number_file . ".php";
            
            $fIn = fopen($dir_content_items.$name_new_item, 'w+'); // create file.html 
            fwrite($fIn, $content_new_items);
            fclose($fIn);

            $result_id = $number_file;
            echo $result_id;
        } else {echo "Error: creating new item ".$_SESSION["userid"];}
    } catch(PDOException $e) {
        echo $sql . "Error: creating new item" ."<br>/n"/*. $e->getMessage()*/;
    }
    //remove
} else {
    echo "no_data";
};

