<?php
trait get_extension {
    function get_extension($neuron_path){
        $path_info = pathinfo($neuron_path);
        if($path_info['extension'] == ""){
            $response = array(
                "status" => "fail",
                "body" => "Path info obj: ".$path_info['extension']."Current neuron path: ".$neuron_path.$e
            );
            echo json_encode($response);
            exit();
        }
        return $path_info['extension'];
    }
}