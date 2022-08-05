<?php
session_start();
include "../protect/server_protect.php";

class delete_post {
    use session_protect;

    protected function delete_post_f($channel_name, $item_id, $user){
        try {
            $dir_content_items = __DIR__ . "/../../channels/".$channel_name."/content_items/";
            $file = $dir_content_items.$item_id.".php";
            if (!unlink($file)) {
                echo ("The post cannot be deleted due to an error");
            }
            else {
                echo "The post has been deleted";
            }
        } catch(PDOException $e){
            echo "<br>" . $e->getMessage();
        }
    }

    public function get_check_data($channel_name, $item_id, $user){
        if((isset($_POST['channel_folder'])) && (isset($_POST['item_id']))){
            $this->delete_post_f($channel_name, $item_id, $user);
        }
    }

}

//controller
$user = $_SESSION["userid"];
$channel_name = $_POST['channel_folder'];
$item_id = $_POST['item_id'];

if($user){
    if(isset($item_id, $channel_name)){
        $delete_post_class = new delete_post();
        $delete_post_class->get_check_data($channel_name, $item_id, $user);
    } else {
        echo "Data is not complete";
    }
}



    
    
