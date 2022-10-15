<?php

function CallAPI($key)
{
    $response = "unset";
    switch ($key)
    {
        case "ADD":
            $response = array("add"=> true);
            break;
        case "PUT":
            $response = array("put"=> true);
            break;
        default:
            $response = array("default"=> true);
    }
    return $response;

}
$response_arr = CallAPI($_POST["key1"]);
echo json_encode($response_arr);