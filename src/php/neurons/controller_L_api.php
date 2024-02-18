<?php
session_start();


if($_POST["data"]){//init_controller  
    $data = json_decode(htmlspecialchars_decode($_POST["data"]), true);
    $action = $data["action"];
    if($action == "activate_L_graph_L_impulse"){
        $graph_name = $data["graph_name"];
        if(isset($graph_name)){
            include $_SERVER['DOCUMENT_ROOT']."/php/units/classes/controller_L_activate_L_graph.php";
            $controller_L_activation = new controller_L_activate_L_graph(
                $graph_name,
                $data["tangle_L_activation"],
                $data["client_L_neuron00s_L_id00s"],
            );

        } else {
            $array_response = array(
                "status" => "fail",
                 "body" => "Data is not received ER000003"
            );
            echo json_encode($array_response);
        }
    } else if ($action == "change_L_neuron"){
        include $_SERVER['DOCUMENT_ROOT']."/php/units/classes/neuron_changing.php";
        if(isset($data["neuron_id"], $data["graph_name"])){

            new neuron_changing(
                $data["parameter"], 
                $data["graph_name"], 
                $data["neuron_tree"], 
                $data["neuron_id"], 
                $data["unix_time"],
                $data["neuron00s_L_ram_X_id"]
            );

        } else {
            $array_response = array(
                "status" => "fail",
                "body"=> "Data is not complete"
            );
            echo json_encode($array_response);
        }
    } else if ($action == "load_L_attachment00s_X_if_exist"){
        $graph_L_name = $data["graph_name"];
        if(isset($graph_L_name)){
            include $_SERVER['DOCUMENT_ROOT']."/php/units/classes/class_L_get_L_attachment00s.php";
            new class_L_get_L_attachment00s(
                $graph_L_name,
                $data["attachment00s_L_name00s_X_all"],
                $data["attachment00s_L_name00s"],
                $data["neuron_L_id"]
            );
        } else {
            $array_response = array(
                "status" => "fail",
                "body" => "Data is not received ER000003"
            );
            echo json_encode($array_response);
        }
    } else if ($action == "remove_L_attachment00s"){
        $graph_L_name = $data["graph_name"];
        if(isset($graph_L_name)){
            include $_SERVER['DOCUMENT_ROOT']."/php/units/classes/class_L_delete_L_attachment00s.php";
            new class_L_delete_L_attachment00s(
                $graph_L_name,
                $data["attachment00s_L_name00s"],
                $data["neuron_L_id"]
            );
        } else {
            $array_response = array(
                "status" => "fail",
                "body" => "Data is not received ER005003"
            );
            echo json_encode($array_response);
        }
    } else if ($action == "change_L_attachment"){
        $graph_L_name = $data["graph_L_name"];
        if(isset($graph_L_name)){
            include $_SERVER['DOCUMENT_ROOT']."/php/units/classes/class_L_creator_L_attachment.php";
            new class_L_creator_L_attachment(
                $graph_L_name,
                $data["type"],
                $data["direction_L_name"],
                $data["attachment_L_key"],
                $data["attachment_L_value"],
                $data["neuron_L_id"]
            );
        }
    } else if ($action == "create_L_channel") {
            $content = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/php/neuron00s_L_special_x_html/creator_L_channel.php');
            $array_response = array(
                "status" => "success",
                "content" => $content
            );
            $json = json_encode($array_response);
            echo $json;
    } else if ($action == "load_L_neuron_L_log_up_L_controller") { 
        $content = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/php/neuron00s_L_special_x_html/creator_L_new_L_user.php');
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
    } else if ($action == "load_L_theme_css"){
        $graph_L_name = $data["graph_L_name"];
        include $_SERVER['DOCUMENT_ROOT']."/php/units/classes/loader_L_theme.php";
        $class_L_theme_L_css = new loader_L_theme(
            $data["theme_L_name"],
            $graph_L_name
        );
        $array_response = array(
            "status" => "success",
            "theme_L_css" => $class_L_theme_L_css->response
        );
        $json = json_encode($array_response);
        echo $json;
    }
} else {
    $array_response = array(
        "status" => "Fail",
        "body" => "No data"
    );
    echo json_encode($array_response); 
}
