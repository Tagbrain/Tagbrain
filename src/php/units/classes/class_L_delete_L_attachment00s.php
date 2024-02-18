<?php
session_start();

include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/check_session_data.php";

class class_L_delete_L_attachment00s {

    use check_session_data;

    function __construct(
        $graph_L_name,
        $attachment00s_L_name00s,
        $neuron_L_id
    ){
        $this->graph_L_name = $graph_L_name;
        $this->neuron_L_id = $neuron_L_id;
        $this->attachment00s_L_name00s_L_for_deletting = $attachment00s_L_name00s;
        $this->attachment00s_L_path = $_SERVER['DOCUMENT_ROOT']."/channels/".$graph_L_name."/attachment00s/";
        $access = $this->check_session_data($graph_L_name);
        if($access["can_editing"] == true){//you_L_editor
            $response = $this->delete_L_attachment00s();
            if($response == true){
                $this->return_success("Attachment is deleted", $access);
            } else {
                $this->return_fail("Attachment is not deleted or not exist");
            }
        } else {
            $this->return_fail("There is no access");
        }
        
    } 
    
    protected function delete_L_attachment00s(){
        foreach ($this->attachment00s_L_name00s_L_for_deletting as $attachment_L_name_X_for_deletting) {

            $base64 = base64_encode($attachment_L_name_X_for_deletting);

            $attachment00s_L_folder00s = array(
                "txt00s" => "txt",      
                "img00s" => "jpg",
                "latex00s" => "latex",
                "ai00s" => "bin"
            );
            foreach($attachment00s_L_folder00s as $folder_name => $extension){
                $folder_L_path = $this->attachment00s_L_path . $folder_name . '/';
                $file_L_path_L_pattern = $folder_L_path.$base64."_X_".$this->neuron_L_id.".".$extension;

                if(file_exists($file_L_path_L_pattern)){
                    if (!unlink($file_L_path_L_pattern)) { 
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            }
            return false;
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