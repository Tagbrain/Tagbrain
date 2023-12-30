<?php
session_start();

include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/check_session_data.php";

class class_L_creator_L_attachment {
    use check_session_data;

    function __construct(
        $graph_L_name,
        $type,
        $direction_L_name,
        $attachment_L_key,
        $attachment_L_value,
        $neuron_L_id
    ){
        $this->graph_L_name = $graph_L_name;
        $this->type = $type;
        $this->direction_L_name = $direction_L_name;
        $this->attachment_L_key = $attachment_L_key;

        if($attachment_L_value == false){
            $this->attachment_L_value = "";
        } else {
            $this->attachment_L_value = $attachment_L_value;
        }

        $this->neuron_L_id = $neuron_L_id;

        $this->attachment00s_L_path = $_SERVER['DOCUMENT_ROOT']."/channels/".$graph_L_name."/attachment00s/".$direction_L_name."/";
        $access = $this->check_session_data($graph_L_name);
        if($access["private"] == true){//graph_L_private
            if($access["can_editing"] == true){//you_L_editor
                $this->complete_L_attachment00s();
            } else {
                $this->return_fail("The channel is private. Log in");
            }
        } else {//graph_L_not_private
            if($access["can_editing"] == true){//you_L_editor
                $this->complete_L_attachment00s();
            }
        }
    }

    protected function complete_L_attachment00s(){
        $this->put_L_attachment();
        $this->return_success("Attachment is completed", $access);
    }

    protected function put_L_attachment(){
        $file_L_name = $this->attachment_L_key . '_X_' . $this->neuron_L_id;
        $extension = '';
        if($this->type == "txt"){
            $extension = '.txt';
        } else if($this->type == "img") {
            $extension = '.png';
        } else {//developing
            $this->return_fail("On developing");
        }
        /*
            } else if($type == "latex00s"){

            } else if ($type == "ai00s"){

            }
        */
        $attachment00s_L_path = $_SERVER['DOCUMENT_ROOT']."/channels/".$this->graph_L_name."/attachment00s/".$this->direction_L_name."/". $file_L_name. $extension;

        if (!file_exists($attachment00s_L_path)) {
            file_put_contents($attachment00s_L_path, $this->attachment_L_value);
        } else {
            file_put_contents($attachment00s_L_path, $this->attachment_L_value);
        }
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