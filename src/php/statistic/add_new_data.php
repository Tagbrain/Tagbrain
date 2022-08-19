<?php
include "create_statistic_json.php";

trait add_new_statistic_data{
    use create_statistic_json;

    protected function controller_add_new_statistic($channel_folder, $new_data){
        $file_path = __DIR__ . "/../../channels/".$channel_folder."/statistic.json";
        if(file_exists($file_path)){
            $filedata = file_get_contents($file_path);
            $data = json_decode($filedata);
        } else {
            $data = $this->add_json_statistic($file_path);
        }

        //give data
        $data["posts_count"] = 0;
        $data["unique_tags"] = 0;
        $data["nodes_count"] = 0;
        $data["connections_count"] = 0;

        //give to object with all tags
            //tags : count
    }
}