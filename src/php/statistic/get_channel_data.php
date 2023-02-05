<?php
session_start();
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/check_session_data.php";
include "../general_units/collect_all_connection.php";
include "../general_units/get_channel_connection_count.php";

class chanell_data_collector{
    use check_session_data;
    use collect_all_connection;
    use get_channel_connection_count;

    protected function get_channel_data($channel_name){
        $dir_brain_files = __DIR__ . "/../../channels/".$channel_name."/content_items/";
        $files = array_diff(scandir($dir_brain_files), array('.', '..'));
        $neuron_count = count($files);
        
        $array_brain_tags = $this->collect_all_connections($files, $dir_brain_files);
        $brain_tags = $array_brain_tags["brain_tags"];
        $brain_connection = $this->get_channel_connection_count($brain_tags, $array_brain_tags["brain_tags_count"]);
       
        $relative_performance = round($brain_connection / $array_brain_tags["brain_tags_count"], 2);
        $brain_density = round($brain_connection / $neuron_count, 2);

        $brain_data = array(
            "Neurons" => $neuron_count,
            "Tags" => $array_brain_tags["brain_tags_count"],
            "Synapses" => $brain_connection,
            "Relative performance" => $relative_performance,
            "Brain density" => $brain_density
        );
    
        $response_arr = array(
            "status" => "success",
            "brain_data" => $brain_data
        );

        
        echo json_encode($response_arr);
    }

    public function get_and_check_data($channel_name){

        $access = $this->check_session_data($channel_name);

        if($access["can_editing"] == true){
            $this->get_channel_data($channel_name);
        } else {
            echo "No access";
        }

    }
}
//OPTIMIZE OPTIMIZE OPTIMIZE OPTIMIZE OPTIMIZE protection

$data = json_decode($_POST["data"]);
    $channel_name = $data->channel_name;
if($_SESSION["userid"]){
    if(isset($channel_name)){
        $chanell_data_collector = new chanell_data_collector();
        $chanell_data_collector->get_and_check_data($channel_name);
    }
}
