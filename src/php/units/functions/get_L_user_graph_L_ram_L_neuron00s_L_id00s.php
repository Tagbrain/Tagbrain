<?php

trait get_L_user_graph_L_ram_L_neuron00s_L_id00s {

    protected function get_L_user_graph_L_ram_L_neuron00s_L_id00s(
        $user_L_name,
        $graph_L_name
    ){
        $response_array = array();
        $user_L_file =  $_SERVER['DOCUMENT_ROOT']."/user00s_L_obj00s/".$user_L_name.".json";
        if(!file_exists($user_L_file)){
            $json = json_encode(array());
            file_put_contents($user_L_file, $json, FILE_APPEND);
        }        
        $jsonData = file_get_contents($user_L_file);
        $user_L_array = json_decode($jsonData, true);
        foreach ($user_L_array as $key => $list_L_graphe00s) {
            if($key == "ram_neuron00s") {
                foreach ($list_L_graphe00s as $name => $graph_L_obj) {
                    if($graph_L_name == $name){
                        foreach ($graph_L_obj as $neuron_L_obj){
                            array_push($response_array, $neuron_L_obj["id"]);
                        }
                    }
                }
            } 
        }
        return $response_array;
    }
}

