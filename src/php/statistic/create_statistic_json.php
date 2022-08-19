<?php

trait create_statistic_json{
    protected function add_json_statistic($file_path){
        $data_array = file_get_contents($file_path);
        $data_element = json_decode($data_array, true);
        $start_data = array(
            "posts_count" => 0,
            "unique_tags" => 0,
            "nodes_count" => 0,
            "connections_count" => 0,
        );
        $fp = fopen($file_path, 'w');
        fwrite($fp, json_encode($start_data, JSON_PRETTY_PRINT));   // here it will print the array 
        fclose($fp);
        return $start_data;
    }
}