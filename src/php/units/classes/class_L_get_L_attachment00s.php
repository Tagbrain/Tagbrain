<?php
session_start();

include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/check_session_data.php";

class class_L_get_L_attachment00s {

    use check_session_data;

    function __construct(
        $graph_L_name,
        $attachment00s_L_name00s,
        $neuron_L_id
    ){
        $this->graph_L_name = $graph_L_name;
        $this->neuron_L_id = $neuron_L_id;
        $this->attachment00s_L_name00s = $attachment00s_L_name00s;
        $this->attachment00s_L_path = $_SERVER['DOCUMENT_ROOT']."/channels/".$graph_L_name."/attachment00s/";
        $access = $this->check_session_data($graph_L_name);
        if($access["private"] == true){//graph_L_private
            if($access["can_editing"] == true){//you_L_editor
                $data = $this->get_L_attachment00s();
                $this->return_success($data, $access);
            } else {
                $this->return_fail("The channel is private. Log in");
            }
        } else {
            $data = $this->get_L_attachment00s();
            $this->return_success($data, $access);
        }
    }
    protected function get_L_attachment00s(){
        $response_L_attachment00s = array(
            "txt00s" => array(),
            "img00s" => array(),
            "attachment_L_no" => array()
        );
        foreach ($this->attachment00s_L_name00s as $attachment_L_name) {

            $attachment00s_L_folder00s = array(
                "txt00s",      
                "img00s",
                "latex00s",
                "ai00s"
            );
            $attachment_L_is_exist = false;
            foreach($attachment00s_L_folder00s as $folder_name){
                $folder_L_path = $this->attachment00s_L_path . $folder_name . '/';
                $file_path = $folder_L_path . $attachment_L_name . '_X_' .  $this->neuron_L_id ;
                //echo $file_path;
                if($folder_name == "img00s"){
                    //destruct_L_attachment_name
                    $file = $file_path . '.png';
                    if (file_exists($file)) {
                        $attachment_L_is_exist = true;
                        $size = getimagesize($file);
                        $img = 'data:' . $size['mime'] . ';base64,' . base64_encode(file_get_contents($file));
                        $microfeature = array($attachment_L_name, $img);
                        array_push($response_L_attachment00s["img00s"], $microfeature);
                    }
                } else if($folder_name == "txt00s"){
                    $file = $file_path . '.txt';
                    if (file_exists($file)) {
                        $attachment_L_is_exist = true;
                        $content = file_get_contents($file);
                        $microfeature = array($attachment_L_name, $content);
                        array_push($response_L_attachment00s["txt00s"], $microfeature);
                    }
                }
            }

            if($attachment_L_is_exist == false){
              array_push($response_L_attachment00s["attachment_L_no"], $attachment_L_name);
            }
        }
        return $response_L_attachment00s;
    }

    protected function return_fail($data){
        $response = array(
            "status" => "fail",
            "data" => $data,
        );
        echo json_encode($response);
    }
    protected function return_success($data, $access){
        $response = array(
            "status" => "success",
            "data" => $data,
        );
        echo json_encode($response);
    }
}