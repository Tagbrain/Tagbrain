<?php
session_start();

include $_SERVER['DOCUMENT_ROOT']."/php/units/classes/neuron_changing.php";

//DEF
$data = json_decode(htmlspecialchars_decode($_POST["data"]));
    $action = $data->action;
    $graph_name = $data->graph_name;
    $neuron_id = $data->neuron_id;
    $neuron_tree = $data->neuron_tree;
    $unix_time = $data->unix_time;

if($_SESSION["userid"]){
    if(isset($neuron_id, $graph_name)){

        $change_post = new neuron_changing($action, $graph_name, $neuron_tree, $neuron_id, $unix_time);
        $change_post->controller_action();

    } else {
        $array_response = array(
            "status" => "fail",
             "body"=> "Data is not complete"
        );
        echo json_encode($array_response);
    }
} else {

    $array_response = array("status" => "No session");
    echo json_encode($array_response); 
    
}