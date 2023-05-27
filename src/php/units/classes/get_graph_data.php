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
            $this->graph_dir = $_SERVER['DOCUMENT_ROOT']."/channels/".$this->graph_name."/content_items/";

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
            $files = array_diff(scandir($this->graph_dir), array('..', '.'));
            $neuron_data_arr = array(); 

            if(count($files) > 20){
                $files = $this->collect_random_array($files, 20);
            }

            foreach($files as $file){

                if($file == ""){
                    continue;
                }

                $neuron_data = $this->get_neuron_data($this->graph_dir, $file);  
                array_push($neuron_data_arr, $neuron_data);
            }
            $access = $this->check_session_data($this->graph_name);
            $this->send_data_c_client($access, $neuron_data_arr);
        } catch (Exception $e){
            $this->return_fail($e);
        };
    }

    protected function get_most_activated_neurons(){
    }

    protected function get_current_neuron(){
        try {
            $access = $this->check_session_data($this->graph_name);
            $neuron_data = $this->get_neuron_data($this->graph_dir, $this->neuron_id.".json"); 
            $this->send_data_c_client($access, $neuron_data);
        } catch (Exception $e){
            $this->return_fail($e);
        };
    }

    public function output_list_posts_variable($graph_folder){     
   }

   protected function return_fail($data){
    $response = array(
        "status" => "fail",
        "data" => $data,
        "contenteditable" => "error"
    );
    echo json_encode($response);
   }
   protected function return_success($data, $access){
    $response = array(
        "status" => "success",
        "data" => $data,
        "contenteditable" => $access["can_editing"],
        "private" => $access["private"],
        "channels" => $_SESSION["all_member_channels"],
        "user" => $_SESSION["userid"],
        "channel_is_private" => $_SESSION["channel_is_private"],
    );
    echo json_encode($response);
   }
   protected function send_data_c_client($access, $data){
    if($access["private"] == true){
        if($access["can_editing"] == true){
            $this->return_success($data, $access);
        } else {
            $this->return_fail("The channel is private. Log in");
        }
    } else {
        $this->return_success($data, $access);
    }
   }
}