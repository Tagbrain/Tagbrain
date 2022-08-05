<?php
session_start();

if($_SESSION["userid"]){
    if(isset($_POST['channel_name'])){
        $channel_name = $_POST["channel_name"];

        if(isset($_POST['array_of_tags'])){
            $array_of_tags = $_POST["array_of_tags"];

            if(isset($_POST['array_of_tags'])){
                $array_of_words = $_POST["array_of_words"];
            }
        }
    }
}