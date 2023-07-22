<?php
session_start();

include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/check_session_data.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/complete_c_tangle_c_activation.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/load_neuron_tree.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_extension.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/put_right_format_file.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_neuron_data.php";

class controller_c_activate_c_graph {
    //untis
    use check_session_data;
    use complete_c_tangle_c_activation;
    use load_neuron_tree;
    use get_extension;
    use put_right_format_file;
    use get_neuron_data;

    function __construct(
        $graph_name, 
        $tangle_c_activation, 
        $client_c_neuron00s_c_id00s
    ){
        $this->graph_name = $graph_name;
        $this->tangle_c_activation = $tangle_c_activation;
        $this->client_c_neuron00s_c_id00s = $client_c_neuron00s_c_id00s;
        
        $this->graph_dir = $_SERVER['DOCUMENT_ROOT']."/channels/".$this->graph_name."/content_items/";

        $access_arr = $this->check_session_data($this->graph_name);

        $this->start_search_controller();
    }

    //controller
    protected function start_search_controller(){

        $neuron00s = array_diff(scandir($this->graph_dir), array('.', '..'));

        $neuron00s_c_obj00s = array();
        foreach($neuron00s as $neuron){

            $neuron_id = str_replace(".php", "", $neuron);

            $neuron_c_obj = $this->complete_c_tangle_c_activation(
                $this->tangle_c_activation, 
                $this->graph_dir,
                $neuron
            );

            if($neuron_c_obj != null){
                array_push($neuron00s_c_obj00s, $neuron_c_obj["neuron"]);
                $this->tangle_c_activation = $neuron_c_obj["tangle"];
            }

        }

        if (empty($neuron00s_c_obj00s)) {
            $response = array(
                "status" => "success",
                "neuron00s_c_client_x_exist" => array(),
                "neuron00s_c_client_x_not_exist" => array(),
                "tangle_c_activation" => array()
            );
            echo json_encode($response);
            exit();
        }

        //sorting
        function cmp($a, $b){
            if ($a == $b) {
                return 0;
            }
            return ($a["neuron_c_activation"] > $b["neuron_c_activation"]) ? -1 : 1;
        }
        usort($neuron00s_c_obj00s, "cmp");

        $neuron00s_c_best = array();
        if(count($neuron00s_c_obj00s) > 20){
            $neuron00s_c_best = array_splice($neuron00s_c_obj00s, 0, 20);
        } else if (count($neuron00s_c_obj00s) <= 20){
            $neuron00s_c_best = $neuron00s_c_obj00s;
        }

        $neuron00s_c_client_x_exist = array();
        $neuron00s_c_client_x_not_exist = array();

        $this->client_c_neuron00s_c_id00s;


        foreach($neuron00s_c_best as $neuron_c_activated){
            $neuron_c_exist_c_client = false;
            foreach($this->client_c_neuron00s_c_id00s as $num => $neuron_c_client){
                if($neuron_c_activated["neuron_c_id"] == $neuron_c_client){
                    array_push($neuron00s_c_client_x_exist, $neuron_c_activated);
                    $neuron_c_exist_c_client = true;
                    break;
                } 
            }
            //not_exist if not break
            if($neuron_c_exist_c_client == false){
                array_push($neuron00s_c_client_x_not_exist, $neuron_c_activated);
            }
        }
        
        //get_c_neuron00s_c_not_exist
        for($i=0; $i < count($neuron00s_c_client_x_not_exist); $i++){
            $neuron_data = $this->get_neuron_data($this->graph_dir."/", $neuron00s_c_client_x_not_exist[$i]["neuron_c_id"].".json");
            $neuron00s_c_client_x_not_exist[$i]["content"] = $neuron_data["neuron_tree_json"]; 
            $neuron00s_c_client_x_not_exist[$i]["time_c_last_edit"] = $neuron_data["time_c_last_edit"];
        }

        $response = array(
            "status" => "success", 
            "neuron00s_c_client_x_exist" => $neuron00s_c_client_x_exist,
            "neuron00s_c_client_x_not_exist" => $neuron00s_c_client_x_not_exist,
            "tangle_c_activation" => $this->tangle_c_activation
        );

        echo json_encode($response);
       
        //delayed function
    }

}
