<?php
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/check_session_data.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/collect_random_array.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_neuron_data.php";

class get_graph_data {
    use collect_random_array;
    use get_neuron_data;
    use check_session_data;

    function __construct($action, $graph_name, $facultative){
        //consultative
            $this->action = $action;
            $this->graph_name = $graph_name;
        //facultative
            $this->amount = $facultative->amount;
            $this->search_keys = $facultative->search_keys;
            $this->neuron_id = $facultative->neuron_id;
        //macrofeatures
            $this->$graph_dir = $_SERVER['DOCUMENT_ROOT']."/channels/".$this->graph_name."/content_items/";

        $this->user = $_SESSION["userid"];
        $this->all_member_channels = $_SESSION["all_member_channels"];
        $this->editors =  $_SESSION["editor"];
        $this->creator = $_SESSION["creator"];

        $this->controller_getting_data();
    }

    public function controller_getting_data(){
        if($this->action == 'get_random_neurons'){
            $this->get_random_neurons();
        } else if ($this->action == 'get_mental_image'){
            $this->get_most_activated_neurons();
        } else if ($this->action == 'get_c_neuron_c_with_id'){
            $this->get_current_neuron();
        }
    }

    protected function get_random_neurons(){
        try {
            $files = array_diff(scandir($this->$graph_dir ), array('..', '.'));
            $neuron_data_arr = array(); 

            if(count($files) > 20){
                $files = $this->collect_random_array($files, 20);
            }

            foreach($files as $file){
                $neuron_data = $this->get_neuron_data($this->$graph_dir, $file);  
                array_push($neuron_data_arr, $neuron_data);
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

    protected function get_current_neuron(){
        try {
            $access = $this->check_session_data($this->graph_name);
            $neuron_data = $this->get_neuron_data($this->$graph_dir, $this->neuron_id.".json"); 
            $response = array(
                "status" => "success",
                "data" => $neuron_data,
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

    public function output_list_posts_variable($graph_folder){     
   }
}