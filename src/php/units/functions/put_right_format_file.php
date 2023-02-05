<?php
include_once $_SERVER['DOCUMENT_ROOT']."/php/units/functions/transformate_txt_tree_to_json.php";

trait put_right_format_file {
    use transformate_txt_tree_to_json;

    function put_right_format_file($neuron_path, $extension){
        if($extension == "json"){
            return $neuron_path;
        } else if($extension == "php" || $extension == "txt"){
            return $this->transformate_txt_to_json($neuron_path);
        } else {
            $response = array(
                "status" => "fail",
                "body" => "Error neuron_file extension"
            );
            echo json_encode($response);
            exit();
        }
    }
}