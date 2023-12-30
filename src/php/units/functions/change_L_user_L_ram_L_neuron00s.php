<?php

trait change_L_user_L_ram_L_neuron00s {

    protected function change_L_user_L_ram_L_neuron00s(
        $neuron00s_L_ram_X_id00s,
        $user_L_name,
        $graph_L_name
    ){
        $graph_path = $_SERVER['DOCUMENT_ROOT']."/channels/".$graph_L_name."/content_items/";
        $user_L_file =  $_SERVER['DOCUMENT_ROOT']."/user00s_L_obj00s/".$user_L_name.".json";
        if(!file_exists($user_L_file)){
            $json = json_encode(array());
            file_put_contents($user_L_file, $json, FILE_APPEND);
        }
        $jsonData = file_get_contents($user_L_file);
        $user_L_obj = json_decode($jsonData, true);

        //check_existance
        $graph_ram_list_L_is_exist = false;
        foreach ($user_L_obj as $key => $value) {
            if($key == "ram_neuron00s") {//add_L_graph_name_X_value
                $graph_ram_list_L_is_exist = true;
            } 
        }

        $neuron00s_L_data = array();
        foreach ($neuron00s_L_ram_X_id00s as $id) {
            array_push(
                $neuron00s_L_data,
                array(
                    "time_L_editing" => filemtime($graph_path.$id.".json"),
                    "id" => $id
                )
            );
        }



        //create_L_ram_neuron00s_L_id00s
        if($graph_ram_list_L_is_exist){//ram_list_L_exist
            $user_L_obj["ram_neuron00s"][$graph_L_name] = $neuron00s_L_data;
        } else {//ram_list_L_not_exist
            array_push(
                $user_L_obj, 
                array(
                    "ram_neuron00s" => array()
                )
            );
            array_push(
                $user_L_obj["ram_neuron00s"], 
                array(
                    $graph_L_name => $neuron00s_L_data
                )
            );
        }
  
        $newJsonData = json_encode($user_L_obj, JSON_PRETTY_PRINT);
        file_put_contents($user_L_file, $newJsonData);
    }

}