<?php
session_start();

include $_SERVER['DOCUMENT_ROOT']."/php/units/classes/get_graph_data.php";

//DEF
$data = json_decode(htmlspecialchars_decode($_POST["data"]));
    $parameter = $data->parameter;
    $graph_name = $data->graph_name;
    $amount = $data->amount;
    $search_keys = $data->search_keys;

if($_SESSION["userid"]){
    if(isset($parameter, $graph_name)){

        $get_graph_class = new get_graph_data($parameter, $graph_name, $amount, $search_keys);
        $get_graph_class->controller_parameter();

    } else {
        $array_response = array(
            "status" => "fail",
             "body" => "Data is not received ER000002"
        );
        echo json_encode($array_response);

    }
} else {

    $array_response = array("status" => "No session");
    echo json_encode($array_response); 
    
}