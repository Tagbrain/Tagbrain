<?php
session_start();

include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/check_session_data.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/complete_L_tangle_L_activation.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/load_neuron_tree.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_extension.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/put_right_format_file.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_neuron_data.php";

class controller_L_activate_L_graph {
    //untis
    use check_session_data;
    use complete_L_tangle_L_activation;
    use load_neuron_tree;
    use get_extension;
    use put_right_format_file;
    use get_neuron_data;

    function __construct(
        $graph_name, 
        $tangle_L_activation, 
        $client_L_neuron00s_L_id00s
    ){
        $this->graph_name = $graph_name;
        $this->tangle_L_activation = $tangle_L_activation;
        $this->client_L_neuron00s_L_id00s = $client_L_neuron00s_L_id00s;
        
        $this->graph_dir = $_SERVER['DOCUMENT_ROOT']."/channels/".$this->graph_name."/content_items/";

        $access_arr = $this->check_session_data($this->graph_name);

        $this->start_search_controller();
    }

    //controller
    protected function start_search_controller(){

        $neuron00s = array_diff(scandir($this->graph_dir), array('.', '..'));

        $neuron00s_L_obj00s = array();
        foreach($neuron00s as $neuron){

            $neuron_id = str_replace(".php", "", $neuron);

            $neuron_L_obj = $this->complete_L_tangle_L_activation(
                $this->tangle_L_activation, 
                $this->graph_dir,
                $neuron
            );

            if($neuron_L_obj != null){
                array_push($neuron00s_L_obj00s, $neuron_L_obj["neuron"]);
                $this->tangle_L_activation = $neuron_L_obj["tangle"];
            }

        }

        if (empty($neuron00s_L_obj00s)) {
            $response = array(
                "status" => "success",
                "neuron00s_L_client_x_exist" => array(),
                "neuron00s_L_client_x_not_exist" => array(),
                "tangle_L_activation" => array()
            );
            echo json_encode($response);
            exit();
        }

        //sorting
        function cmp($a, $b){
            if ($a == $b) {
                return 0;
            }
            return ($a["neuron_L_activation"] > $b["neuron_L_activation"]) ? -1 : 1;
        }
        usort($neuron00s_L_obj00s, "cmp");

        $neuron00s_L_best = array();
        if(count($neuron00s_L_obj00s) > 20){
            $neuron00s_L_best = array_splice($neuron00s_L_obj00s, 0, 20);
        } else if (count($neuron00s_L_obj00s) <= 20){
            $neuron00s_L_best = $neuron00s_L_obj00s;
        }

        $neuron00s_L_client_x_exist = array();
        $neuron00s_L_client_x_not_exist = array();

        $this->client_L_neuron00s_L_id00s;


        foreach($neuron00s_L_best as $neuron_L_activated){
            $neuron_L_exist_L_client = false;
            foreach($this->client_L_neuron00s_L_id00s as $num => $neuron_L_client){
                if($neuron_L_activated["neuron_L_id"] == $neuron_L_client){
                    array_push($neuron00s_L_client_x_exist, $neuron_L_activated);
                    $neuron_L_exist_L_client = true;
                    break;
                } 
            }
            //not_exist if not break
            if($neuron_L_exist_L_client == false){
                array_push($neuron00s_L_client_x_not_exist, $neuron_L_activated);
            }
        }
        
        //get_L_neuron00s_L_not_exist
        for($i=0; $i < count($neuron00s_L_client_x_not_exist); $i++){
            $neuron_data = $this->get_neuron_data(
                $this->graph_dir, 
                $neuron00s_L_client_x_not_exist[$i]["neuron_L_id"].".json"
            );
            $neuron00s_L_client_x_not_exist[$i]["content"] = $neuron_data["neuron_tree_json"]; 
            $neuron00s_L_client_x_not_exist[$i]["time_L_last_edit"] = $neuron_data["time_L_last_edit"];
        }

        $response = array(
            "status" => "success", 
            "neuron00s_L_client_x_exist" => $neuron00s_L_client_x_exist,
            "neuron00s_L_client_x_not_exist" => $neuron00s_L_client_x_not_exist,
            "tangle_L_activation" => $this->tangle_L_activation
        );

        echo json_encode($response);
       
        //delayed function
    }

}
