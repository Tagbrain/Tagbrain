<?php
session_start();
include_once $_SERVER['DOCUMENT_ROOT']."/php/units/functions/check_session_data.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_c_neuron_c_synapses_c_complementarity_c_target_request.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_c_neuron_c_synapses_c_complementarity_c_regexp.php";

class search_controller {
    use get_c_neuron_c_synapses_c_complementarity_c_target_request;
    use get_c_neuron_c_synapses_c_complementarity_c_regexp;
    use check_session_data;

    function __construct(
        $graph_name, 
        $request_data, 
        $regexp_is_activated, 
        $is_all_graphes_activated
    ){
        $this->graph_name = $graph_name;
        $this->is_all_graphes_activated = $is_all_graphes_activated;
        $this->request_data = $request_data;
        $this->regexp_is_activated = $regexp_is_activated; 
        $this->graph_path = $_SERVER['DOCUMENT_ROOT']."/channels/".$this->graph_name."/content_items/";
    }

    //controller
    public function start_search_controller(){
        $this->get_and_check_data();
        $obj_c_search_words_x_general = array();
        if($this->is_all_graphes_activated){
            
            foreach($_SESSION["all_member_channels"] as $some_graph){
                $some_graph_c_path = $_SERVER['DOCUMENT_ROOT']."/channels/".$some_graph."/content_items/";
                $neurons = array_diff(scandir($some_graph), array('.', '..'));
                foreach($neurons as $neuron){
                    $obj_c_search_words = array();
                    if($this->regexp_is_activated){
                        $obj_c_search_words = $this->get_c_neuron_c_synapses_c_complementarity_c_regexp(
                            $this->graph_path.$neuron, 
                            $neuron, 
                            $this->request_data
                        );
                        if($obj_c_search_words == false) continue;
                    } else {
                        $obj_c_search_words = $this->get_c_neuron_c_synapses_c_complementarity_c_target_request(
                            $some_graph_c_path."/".$neuron, 
                            $neuron, 
                            $this->request_data);
                        if($obj_c_search_words == false) continue;
                    }
                    if(count($obj_c_search_words) > 0){//if exist target words
                        if(array_key_exists($some_graph, $obj_c_search_words_x_general)){//attach_L_main_array
                            $obj_c_search_words["time_L_last_edit"] = filemtime($some_graph_c_path."/".$neuron);
                            array_push(
                                $obj_c_search_words_x_general[$some_graph], 
                                $obj_c_search_words
                            );
                        } else {//create_L_main_array
                            $obj_c_search_words["time_L_last_edit"] = filemtime($some_graph_c_path."/".$neuron);
                            $obj_c_search_words_x_general[$some_graph] = array($obj_c_search_words);
                        }
                    }
                }
            }
           
        } else {
            $neurons = array_diff(scandir($this->graph_path), array('.', '..'));

            foreach($neurons as $neuron){
                $obj_c_search_words = array();
                if($this->regexp_is_activated){//true
                    $obj_c_search_words = $this->get_c_neuron_c_synapses_c_complementarity_c_regexp(
                        $this->graph_path.$neuron, 
                        $neuron, 
                        $this->request_data
                    );
                    if($obj_c_search_words == false) continue;
                } else {//false
                    $obj_c_search_words = $this->get_c_neuron_c_synapses_c_complementarity_c_target_request(
                        $this->graph_path.$neuron, 
                        $neuron, 
                        $this->request_data);
                    if($obj_c_search_words == false) continue;
                }
                if(count($obj_c_search_words) > 0){//if exist target words
                    if(array_key_exists($this->graph_name, $obj_c_search_words_x_general)){
                        $obj_c_search_words["time_L_last_edit"] = filemtime($this->graph_path.$neuron);
                        array_push($obj_c_search_words_x_general[$this->graph_name], $obj_c_search_words);
                    } else {
                        $obj_c_search_words["time_L_last_edit"] = filemtime($this->graph_path.$neuron);
                        $obj_c_search_words_x_general[$this->graph_name] = array($obj_c_search_words);
                    }
                }
            }
        }
  
        foreach($obj_c_search_words_x_general as $objs_c_graph){
            usort($objs_c_graph, array($this, "sort_c_search_obj"));
        }

        $obj00s_L_neuron_X_search = array();
        if(count($obj_c_search_words_x_general ) > 20){
            $obj00s_L_neuron_X_search = array_splice($obj_c_search_words_x_general, 0, 20);
        } else if (count($obj_c_search_words_x_general) <= 20){
            $obj00s_L_neuron_X_search = $obj_c_search_words_x_general;
        }

        $this->return_success($obj00s_L_neuron_X_search);

    }
    protected function sort_c_search_obj($a, $b){
        if ($a == $b) {
            return 0;
        }
        return ($a["count"] > $b["count"]) ? -1 : 1;
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
    protected function change_post_name_activation(){
        //last posts decrease
        //first posts increase
    }
    protected function create_cluster_memory(){
        /*
            delete similar clusters
            clusters memory

         get 5 the best FROM 
         list_posts_with_activation
         for this SEARCH_QUERY
            5
                //post_name
                //activation
                //is_node

            // get lists_posts memory
            // get current key_search_array
        // create list from this words
        // add general tags from this 
        */
    }
    protected function get_and_check_data(){
        $access_arr = $this->check_session_data($this->graph_name);
        if($access_arr["can_editing"] == false){
            $this->return_fail("No access | 13466");
        }
    }
}
