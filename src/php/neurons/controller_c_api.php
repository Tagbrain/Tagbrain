<?php
session_start();


if($_POST["data"]){//init_controller  
    $data = json_decode(htmlspecialchars_decode($_POST["data"]), true);
    $action = $data["action"];
    if($action == "activate_c_graph_c_impulse"){
        $graph_name = $data["graph_name"];
        if(isset($graph_name)){
            include $_SERVER['DOCUMENT_ROOT']."/php/units/classes/controller_c_activate_c_graph.php";
            $controller_c_activation = new controller_c_activate_c_graph(
                $graph_name,
                $data["tangle_c_activation"],
                $data["client_c_neuron00s_c_id00s"],
            );

        } else {
            $array_response = array(
                "status" => "fail",
                 "body" => "Data is not received ER000003"
            );
            echo json_encode($array_response);
        }
    }
} else {
    $array_response = array(
        "status" => "Fail",
        "body" => "No data"
    );
    echo json_encode($array_response); 
}
