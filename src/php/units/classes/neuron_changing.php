<?php

include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/put_neuron_tree_in_file.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/check_session_data.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/change_L_user_L_ram_L_neuron00s.php";

class neuron_changing {

    use check_session_data;
    use put_neuron_tree_in_file;
    use change_L_user_L_ram_L_neuron00s;

    function __construct(
        $action, 
        $graph_name, 
        $neuron_tree, 
        $neuron_id, 
        $unix_time, 
        $neuron00s_L_ram_X_id00s
    ){
        $this->action = $action;
        $this->graph_name = $graph_name;
        $this->neuron_id = $neuron_id;
        $this->neuron_tree = $neuron_tree;
        $this->unix_time = $unix_time;

        $this->neuron00s_L_ram_X_id00s = $neuron00s_L_ram_X_id00s;

        $this->neuron00s_L_ram_X_id00s = $neuron00s_L_ram_X_id00s;

        $this->channel =  $_SERVER['DOCUMENT_ROOT']."/channels/".$this->graph_name;
        $this->graph_dir = $this->channel."/content_items/";
        $this->graph_history = $this->channel."/last_changing";

        $this->user = $_SESSION["userid"];
        $this->all_member_channels = $_SESSION["all_member_channels"];
        $this->editors =  $_SESSION["editor"];
        $this->creators = $_SESSION["creator"];
        $this->controller_action();
    }

    public function controller_action(){
        $access_arr = $this->check_session_data($this->graph_name);
        $is_valid = $access_arr["can_editing"];
        if($is_valid == true){

            try{
                if($this->action == 'change'){
                    $this->change_neuron();
                } else if($this->action == 'add'){
                    $this->add_neuron();
                } else if($this->action == 'add_c_cookie_x_draft_zc_neuron'){
                    $this->add_c_cookie_x_draft_zc_neuron(); 
                } else if($this->action == 'remove'){
                    $this->remove_neuron();
                } 
            } catch(PDOException $e) {
                $response = array(
                    "status" => "error",
                    "body" => $e,
                    "code" => "0000001",
                );
                echo json_encode($response);
                exit();
            }

        } else {

            $array_response = array("status" => "No access");
            echo json_encode($array_response);

        }

    }

    protected function change_neuron_tree($neuron_path){
        if(file_exists($neuron_path)){
            $this->put_neuron_tree_in_file($neuron_path, $this->neuron_tree, false);
        } else if($this->action == "add"){
            $this->put_neuron_tree_in_file($neuron_path, $this->neuron_tree, true);
        } else {
            $array_response = array("status" => "Neuron not exist | isn't adding");
            echo  json_encode($array_response);
            exit();
        }
        
        //change_L_user_obj
        if($this->neuron00s_L_ram_X_id00s != false){
            $this->change_L_user_L_ram_L_neuron00s(
                $this->neuron00s_L_ram_X_id00s,
                $_SESSION["userid"],
                $this->graph_name
            );
        }
    }

    protected function put_history_changing_row(){
        $new_row = $this->user.",".$this->neuron_id.",".$this->unix_time."\n";
        if(!file_exists($this->graph_history.'.csv')){
            file_put_contents($this->graph_history.'.csv', $new_row, FILE_APPEND);
        }
        $writing = fopen($this->graph_history.'.tmp', 'w');
        $reading = fopen($this->graph_history.'.csv', 'r');
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
            rename($this->graph_history.'.tmp', $this->graph_history.'.csv');
        } else {
            unlink($this->graph_history.'.tmp');
        }

        //$new_row = $user.",".$item_id.",".$file_time."\n";
        //file_put_contents("$post_changing_statistic", $new_row ,FILE_APPEND);

    }


    protected function add_neuron(){
        $name_neuron = $this->neuron_id.".json";
        $link_neuron = $this->graph_dir.$name_neuron;
        $this->change_neuron_tree($link_neuron);

        $response = array(
            "status" => "success",
            "id" => $this->neuron_id
        );
        echo json_encode($response);
    }


    protected function change_neuron(){
        $name_neuron = $this->neuron_id.".json";
        $link_neuron = $this->graph_dir.$name_neuron;
        $this->change_neuron_tree($link_neuron);
        //$this->put_history_changing_row($link_neuron);

        $response = array(
            "status" => "success",
            "body" => "Neuron tree is changed"
        );

        echo json_encode($response);
    }

    protected function  remove_neuron(){
        $response = array(
            "status" => "fail",
            "body" => "Neuron tree is NOT changed"
        );
        try {
            $file = $this->graph_dir.$this->neuron_id.".json";
            if (!unlink($file)) {
                $response["body"] = "The post cannot be deleted due to an error";
            } else {
                $response = array(
                    "status" => "success",
                    "body" => "The neuron has been deleted"
                );
            }
        } catch(PDOException $e){
            $response["body"] = $e->getMessage();
        }
        echo json_encode($response);
    }

}