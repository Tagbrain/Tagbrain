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
    } else if ($action == "create_c_channel") {
            $content = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/php/neuron00s_c_special_x_html/creator_c_channel.php');
            $array_response = array(
                "status" => "success",
                "content" => $content
            );
            $json = json_encode($array_response);
            echo $json;
    } else if ($action == "load_c_neuron_c_log_up_c_controller") { 
        $content = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/php/neuron00s_c_special_x_html/creator_c_new_c_user.php');
        $array_response = array(
            "status" => "success",
            "content" => $content
        );
        $json = json_encode($array_response);
        echo $json;
    } else if ($action == "add_L_user_L_new") { 

        $user_L_name_X_new = $data["user_L_name_X_new"];
        $user_L_password_X_new = $data["user_L_password_X_new"];
        $user_L_email_X_new = $data["user_L_email_X_new"];

        include $_SERVER['DOCUMENT_ROOT']."/php/units/classes/controller_L_create_L_user_L_new.php";
        new controller_L_create_L_user_L_new($user_L_name_X_new, $user_L_password_X_new, $user_L_email_X_new);
        //create new user
    } else if ($action == "add_L_new_L_graph"){

        $new_channel_name = $data["channel_name"];
        $graph_L_is_private = $data["graph_L_is_private"];

        include $_SERVER['DOCUMENT_ROOT']."/php/channels_function/add_channel/add_new_channel_exporter.php";
        
        $create_channel = new create_channel_controller(
            $_SESSION["userid"], 
            $new_channel_name, 
            $graph_L_is_private
        );

    } else if ($action == "delete_L_graph"){
        $graph_L_name_L_for_remove = $data["graph_L_name"];

        include $_SERVER['DOCUMENT_ROOT']."/php/channels_function/add_channel/remove_channel_exporter.php";

        new remove_channel_controller(
            $graph_L_name_L_for_remove 
        );
    }
} else {
    $array_response = array(
        "status" => "Fail",
        "body" => "No data"
    );
    echo json_encode($array_response); 
}
