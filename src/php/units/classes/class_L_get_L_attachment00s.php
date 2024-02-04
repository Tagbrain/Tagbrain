<?php
session_start();

include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/check_session_data.php";

class class_L_get_L_attachment00s {

    use check_session_data;

    function __construct(
        $graph_L_name,
        $attachment00s_L_name00s_X_all,
        $attachment00s_L_name00s_L_searched,
        $neuron_L_id
    ){
        //def
        $this->graph_L_name = $graph_L_name;
        $this->neuron_L_id = $neuron_L_id;
        $this->attachment00s_L_name00s_X_all = $attachment00s_L_name00s_X_all;
        $this->attachment00s_L_name00s_L_searched = $attachment00s_L_name00s_L_searched;

        $this->attachment00s_L_path = $_SERVER['DOCUMENT_ROOT']."/channels/".$graph_L_name."/attachment00s/";

        $this->response_L_attachment00s = array(
            "txt00s" => array(),
            "img00s" => array(),
            "attachment_L_no" => array(),
            "old_L_attachment00s" => array()
        );

        //controller
        $access = $this->check_session_data($graph_L_name);
        if($access["private"] == true){//graph_L_private
            if($access["can_editing"] == true){//you_L_editor
                $this->get_L_attachment00s();
                $this->return_success();
            } else {
                $this->return_fail("The channel is private. Log in");
            }
        } else {
            $this->get_L_attachment00s();
            $this->return_success();
        }
    }
    protected function get_L_attachment00s(){

        foreach ($this->attachment00s_L_name00s_L_searched as $name_L_searched) {

            $att_L_is_exist_X_txt = $this->get_L_attachment00s_L_txt($name_L_searched);
            $att_L_is_exist_X_img = $this->get_L_attachment00s_L_img($name_L_searched);

            if(!$att_L_is_exist_X_txt){
                if(!$att_L_is_exist_X_img){//microfeature not exist

                    if(!in_array($name_L_searched, $this->response_L_attachment00s["attachment_L_no"])){
                        array_push($this->response_L_attachment00s["attachment_L_no"], $name_L_searched);
                    }

                }
            } 
        }
    }
    protected function get_L_attachment00s_L_txt($name_L_searched){
        $folder_L_path = $this->attachment00s_L_path . "txt00s" . '/';
        $attachment00s_L_file00s_L_name00s = array_diff(scandir($folder_L_path), array('.', '..'));
        $is_got = false;
        foreach($attachment00s_L_file00s_L_name00s as $attachment_L_file_L_name){

            $attachment_L_name_X_neurond_id_X_from_server = pathinfo($attachment_L_file_L_name, PATHINFO_FILENAME);
            $att_L_arr = explode("_X_", $attachment_L_name_X_neurond_id_X_from_server);
            $name_L_from_server = $att_L_arr[0];
            $neuron_id_L_from_server = $att_L_arr[1];

            if($name_L_from_server == $name_L_searched){//attachment_L_is_finded

                $file = $folder_L_path .$attachment_L_file_L_name;
                $content = file_get_contents($file);
                $microfeature = array($name_L_searched, $content);
                array_push($this->response_L_attachment00s["txt00s"], $microfeature);
                $is_got = true;
            } else {//check in input array
                if($neuron_id_L_from_server == $this->neuron_L_id){//check_L_attachment_is_from_the_neuron
                    if(!in_array($name_L_from_server, $this->attachment00s_L_name00s_X_all)){
                        if(!in_array($name_L_from_server, $this->response_L_attachment00s["old_L_attachment00s"])){
                            array_push($this->response_L_attachment00s["old_L_attachment00s"], $name_L_from_server);
                        }
                    }
                }
            }

        }
        return $is_got;
    }
    protected function get_L_attachment00s_L_img($name_L_searched){
        $folder_L_path = $this->attachment00s_L_path . "txt00s" . '/';
        $attachment00s_L_file00s_L_name00s = array_diff(scandir($folder_L_path), array('.', '..'));
        $is_got = false;
        foreach($attachment00s_L_file00s_L_name00s as $attachment_L_file_L_name){

            $attachment_L_name_X_from_server = pathinfo($attachment_L_file_L_name, PATHINFO_FILENAME);
            $att_L_arr = explode("_X_", $attachment_L_name_X_neurond_id_X_from_server);
            $name_L_from_server = $att_L_arr[0];
            $neuron_id_L_from_server = $att_L_arr[1];
            
            if($name_L_from_server == $name_L_searched){//attachment_L_is_finded

                $file = $folder_L_path .$attachment_L_file_L_name;
                $size = getimagesize($file);
                $img = 'data:' . $size['mime'] . ';base64,' . base64_encode(file_get_contents($file));
                $microfeature = array($name_L_searched, $img);
                array_push($this->response_L_attachment00s["img00s"], $microfeature);
                $is_got = true;

            } else {
                if($neuron_id_L_from_server == $this->neuron_L_id){//check_L_attachment_is_from_the_neuron
                    if(!in_array($name_L_from_server, $this->attachment00s_L_name00s_X_all)){
                        if(!in_array($name_L_from_server, $this->response_L_attachment00s["old_L_attachment00s"])){
                            array_push($this->response_L_attachment00s["old_L_attachment00s"], $name_L_from_server);
                        }
                    }
                }
            }

        }
        return $is_got;
    }

    protected function return_fail(){
        $response = array(
            "status" => "fail",
            "data" => $this->response_L_attachment00s,
        );
        echo json_encode($response);
    }
    protected function return_success(){
        $response = array(
            "status" => "success",
            "data" => $this->response_L_attachment00s,
        );
        echo json_encode($response);
    }
}