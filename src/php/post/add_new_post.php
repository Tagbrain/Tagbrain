<?php
session_start();

$data = json_decode(htmlspecialchars_decode($_POST["data"]));
    $content_neuron = $data->content_neuron;
    $channel_name = $data->channel_name;
    
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
            fwrite($fIn, $content_neuron);
            fclose($fIn);

            $result_id = $number_file;
            $response = array(
                "status" => "success",
                "id" => $result_id
            );
            echo json_encode($response);
        } else {echo "Error: creating new item ".$_SESSION["userid"];}
    } catch(PDOException $e) {
        echo $sql . "Error: creating new item" ."<br>/n"/*. $e->getMessage()*/;
    }
    //remove
} else {
    $response = array(
        "status" => "failure",
    );
    echo json_encode($response);
};

