<?php
session_start();

include $_SERVER['DOCUMENT_ROOT']."/php/units/classes/class_search_request.php";

$data = json_decode(htmlspecialchars_decode($_POST["data"]));
    $graph_name = $data->graph_name;
    $request_data = $data->data;
    $regexp_is_activated = $data->regexp_is_activated;
    $is_all_graphes_activated = $data->is_all_graphes_activated;

//init_controller  
if($_POST["data"]){  
    if(isset($graph_name, $request_data)){
        $search_controller = new search_controller(
            $graph_name, 
            $request_data, 
            $regexp_is_activated, 
            $is_all_graphes_activated
        );
        $search_controller->start_search_controller();
    } else {
        $array_response = array(
            "status" => "fail",
             "body" => "Data is not received ER000003"
        );
        echo json_encode($array_response);
    }
} else {
    $array_response = array("status" => "No data");
    echo json_encode($array_response); 
}


