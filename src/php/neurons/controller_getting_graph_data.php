<?php
session_start();

include $_SERVER['DOCUMENT_ROOT']."/php/units/classes/get_graph_data.php";

//DEF
$data = json_decode(htmlspecialchars_decode($_POST["data"]));
    $action = $data->action;
    $graph_name = $data->graph_name;
    $facultative = $data->facultative;

if(isset($action, $graph_name)){

    $get_graph_class = new get_graph_data(
        $action, 
        $graph_name, 
        $facultative
    );

} else {
    $array_response = array(
        "status" => "fail",
            "body" => "Data is not received ER000002"
    );
    echo json_encode($array_response);

}
