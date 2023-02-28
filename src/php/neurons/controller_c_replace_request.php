<?php
session_start();

include $_SERVER['DOCUMENT_ROOT']."/php/units/classes/class_c_replace_controller.php";

//definition
$user = $_SESSION["userid"];
$data = json_decode(htmlspecialchars_decode($_POST["data"]));
    $graph_name = $data->graph_name;
    $searcher = $data->searcher;
    $replacement = $data->replacement;
    $neuron_s_c_for_search = $data->neuron_s_c_for_search;
    $regexp_is_activated = $data->regexp_is_activated;
    $is_all_graphes_activated = $data->is_all_graphes_activated;

//init_controller  
if($_SESSION["userid"]){  
    if(isset($graph_name, $searcher, $replacement)){
        $class_c_replace_controller = new class_c_replace_controller($data);
    } else {
        $array_response = array(
            "status" => "fail",
             "body" => "Data is not received ER00000246"
        );
        echo json_encode($array_response);
    }
} else {
    $array_response = array("status" => "No session");
    echo json_encode($array_response); 
}

