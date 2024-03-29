<?php
session_start();
include_once $_SERVER['DOCUMENT_ROOT']."/php/units/functions/check_session_data.php";

include_once $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_L_neuron_L_synapses_L_complementarity_L_target_request.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_L_neuron_L_synapses_L_complementarity_L_regexp.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/units/functions/put_neuron_tree_in_file.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/units/functions/load_neuron_tree.php";

class class_L_replace_controller {
    use get_L_neuron_L_synapses_L_complementarity_L_target_request;
    use get_L_neuron_L_synapses_L_complementarity_L_regexp;
    use check_session_data;
    use put_neuron_tree_in_file;
    use load_neuron_tree;

    function __construct($data){
        $this->graph_name = $data->graph_name;
        $this->searcher = $data->searcher;
        $this->replacement = $data->replacement;
        $this->neuron_s_L_for_search = $data->neuron_s_L_for_search;

        $this->is_all_graphes_activated = $data->is_all_graphes_activated;
        $this->regexp_is_activated = $data->regexp_is_activated; 
        
        $this->graph_path = $_SERVER['DOCUMENT_ROOT']."/channels/".$this->graph_name."/content_items/";
        $this->start_replace_controller();
        $this->return_success("replaced");
    }

    protected function start_replace_controller(){
        $this->get_and_check_data();
        if($this->is_all_graphes_activated){
            foreach($_SESSION["all_member_channels"] as $some_graph){
                $some_graph_L_path = $_SERVER['DOCUMENT_ROOT']."/channels/".$some_graph."/content_items/";
                foreach($this->neuron_s_L_for_search as $neuron_L_finded){
                    $path_L_curr = $some_graph_L_path.$neuron_L_finded.".json";
                    if (file_exists($path_L_curr)) {
                        if($this->regexp_is_activated){
                            $this->replace_target_regexp($path_L_curr);
                        } else {
                            $this->replace_target_string($path_L_curr);
                        }
                    } 
                }
            }
        } else {
            foreach($this->neuron_s_L_for_search as $neuron_L_finded){
                $path_L_curr = $this->graph_path.$neuron_L_finded.".json";
                if (file_exists($path_L_curr)){
                    if($this->regexp_is_activated){
                        $this->replace_target_regexp($path_L_curr);
                    } else {
                        $this->replace_target_string($path_L_curr);
                    }
                }
            }
        }
    }

    protected function replace_target_regexp($neuron_path){
        $outgrowths = $this->load_neuron_tree($neuron_path, false);
        $outgrowth_s_L_new = array();
        foreach($outgrowths as $outgrowth){
            $outgrowth_L_new = preg_replace(
                "/".$this->searcher."/i",
                $this->replacement,
                $outgrowth,
            );
            array_push($outgrowth_s_L_new, $outgrowth_L_new);
        };
        $this->put_neuron_tree_in_file($neuron_path, $outgrowth_s_L_new, false);
    }

    protected function replace_target_string($neuron_path){
        $outgrowths = $this->load_neuron_tree($neuron_path, false);
        $outgrowth_s_L_new = array();
        foreach($outgrowths as $outgrowth){
            $outgrowth_L_new = str_replace(
                "/".$this->searcher."/i",
                $this->replacement,
                $outgrowth,
            );
            array_push($outgrowth_s_L_new, $outgrowth_L_new);
        };
        $this->put_neuron_tree_in_file($neuron_path, $outgrowth_s_L_new, false);
    }

    protected function return_success($body){
        $response = array(
            "status" => "success", 
            "content" => $body
        );
        echo json_encode($response);
    }
    protected function return_fail($body){
        $response = array(
            "status" => "fail", 
            "content" => $body
        );
        echo json_encode($response);
        exit();
    }
    protected function get_and_check_data(){
        $access_arr = $this->check_session_data($this->graph_name);
        if($access_arr["can_editing"] == false){
            $this->return_fail("No access | 1334566");
        }
    }

}