<?php
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/protect_session.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/collect_random_array.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_neuron_data.php";

class get_graph_data {
    use collect_random_array;
    use get_neuron_data;
    use session_protect;


    function __construct($parameter, $graph_name, $amount, $search_keys){
        $this->parameter = $parameter;
        $this->graph_name = $graph_name;
        $this->amount = $amount;
        $this->search_keys = $search_keys;

        $this->user = $_SESSION["userid"];
        $this->all_member_channels = $_SESSION["all_member_channels"];
        $this->editors =  $_SESSION["editor"];
        $this->creators = $_SESSION["creator"];
    }

    public function controller_parameter(){
        if($this->parameter == 'get_random_neurons'){
            $this->get_random_neurons();
        } else if ($this->parameter == 'get_mental_imagine'){
            $this->get_most_activated_neurons();
        } else if ($this->parameter == 'get_graph_info'){
            //
        }
    }

    protected function get_random_neurons(){
        
        $graph_dir = $_SERVER['DOCUMENT_ROOT']."/channels/".$this->graph_name."/content_items/";
        try {
            $files = array_diff(scandir($graph_dir), array('..', '.'));
            $neuron_data_arr = array(); 

            if(count($files) > 20){
                $files = $this->collect_random_array($files, 20);
            }

            foreach($files as $file){
                $neuron_data = $this->get_neuron_data($graph_dir, $file);  
                array_push($neuron_data_arr, $neuron_data);

                /* #remove
                    "neuron_path" => $new_neuron_path,
                    "neuron_id" => $neuron_id,
                    "time_last_change" => $time_last_change,
                    "neuron_tree_json" => $neuron_tree_json,
                */
            }
            $access = $this->check_session_data($this->graph_name);
            $response = array(
                "status" => "success",
                "data" => $neuron_data_arr,
                "contenteditable" => $access["can_editing"]
            );
            echo json_encode($response);
        
        } catch (Exception $e){
            $response = array(
                "status" => "fail",
                "data" => $e
            );
            echo json_encode($response);
        };
    }

    protected function get_most_activated_neurons(){
    
    }

    public function output_list_posts_variable($graph_folder){
        
   }
}