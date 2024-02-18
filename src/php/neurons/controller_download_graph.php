<?php
session_start();
include_once $_SERVER['DOCUMENT_ROOT']."/php/units/classes/class_zip_archiver.php";
$data = json_decode(htmlspecialchars_decode($_POST["data"]));
    $action = $data->action;
    $is_export_all = $data->is_export_all;
    $graph_name = $data->graph_name;

//init_controller  
if($data){  
    if(isset($action)){
        $uniq_name = $graph_name."_".session_id()."_".strval(time());
        $keeper_zip = generate_folder_L_purpose_L_for_zip($uniq_name);
        $zip_path = generate_zip_archive($keeper_zip);
        get_L_zip_archive_x_ftp($zip_path);
        //delete_L_zip_archieve($uniq_name);
    } else {
        $array_response = array(
            "status" => "fail",
             "body" => "Data is not received ER003757768"
        );
        echo json_encode($array_response);
    }
} else {
    $array_response = array("status" => "No session 0283495");
    echo json_encode($array_response); 
}

function get_L_zip_archive_x_ftp($zip_path){
    header("Pragma: public");
    header("Expires: 0");
    header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
    header("Cache-Control: public");
    header("Content-Description: File Transfer");
    header("Content-type: application/octet-stream");
    header('Content-Disposition: attachment;filename="'.basename($zip_path).'"');
    header("Content-Transfer-Encoding: binary");
    header("Content-Length: ".filesize($zip_path));
    readfile($zip_path);
    exit;
    //unlink($zip_path);
}

function custom_copy($src, $dst) { 
    $dir = opendir($src); 
    @mkdir($dst); 
    while( $file = readdir($dir) ) { 
        if (( $file != '.' ) && ( $file != '..' )) { 
            if ( is_dir($src . '/' . $file) ) { 
                custom_copy($src . '/' . $file, $dst . '/' . $file); 
            } else { 
                copy($src . '/' . $file, $dst . '/' . $file); 
            } 
        } 
    } 
    closedir($dir);
} 

function generate_zip_archive($keeper_zip){
    $zipper = new class_zip_archiver();
    $dirPath = $keeper_zip;
    $zipPath = $keeper_zip."-z".".zip";
    
    // Create zip archive
    $zip = $zipper->zipDir($dirPath, $zipPath);
    return $zipPath;
}

function generate_folder_L_purpose_L_for_zip($uniq_name){
    $keeper_zip_s = $_SERVER['DOCUMENT_ROOT']."/zip_L_timing_container/";
    $keeper_zip = $keeper_zip_s.$uniq_name;
    mkdir($keeper_zip, 0777, true);
    $path_L_dir_L_channel_s = $_SERVER['DOCUMENT_ROOT']."/channels/";
    foreach($_SESSION["all_member_channels"] as $current_channel){
        $path_channel_folder = $path_L_dir_L_channel_s.$current_channel;
        custom_copy($path_channel_folder, $keeper_zip."/".$current_channel);
    }
    return $keeper_zip;
}