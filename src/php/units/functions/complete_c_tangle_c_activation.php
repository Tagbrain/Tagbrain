<?php
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/load_neuron_tree.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_row_depth.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_pos_activation.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_key_activation.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/collect_c_unique_c_array.php";

include $_SERVER['DOCUMENT_ROOT']."/php/units/brain/get_c_og_c_child00s_c_verified.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/brain/get_c_og_c_neighbour00s.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/brain/get_og_c_parent_c_verified.php";


trait complete_c_tangle_c_activation {

    use get_c_og_c_child00s_c_verified;
    use get_c_og_c_neighbour00s;
    use get_og_c_parent_c_verified;
    use collect_c_unique_c_array;

    use get_row_depth;
    use get_pos_activation;
    use get_key_activation;

    use load_neuron_tree;


    protected function complete_c_tangle_c_activation(
        $tangle_c_activation,
        $graph,
        $neuron
    ){
        $neuron_id = str_replace(".json", "", $neuron);
        $tags_array = array(); // tag // the most depth space 
        
        $neuron_c_activation = 0;

        $parent00s_c_activation = 0;
        $child00s_c_activation = 0;
        $neighbor00s_c_activation = 0;

        $tree = $this->load_neuron_tree($graph.$neuron, false);

        $row_num = 0;
        foreach($tree as $og){
            $content = $og["content"];

            for ($i = 0; $i < count($tangle_c_activation); $i++) { 
                
                $synapse_c_key = $tangle_c_activation[$i]["synapse"];
                $reg_c_child00s = '/'.join("|", $tangle_c_activation[$i]["child00s"]).'/iu';
                $reg_c_neighbor00s = '/'.join("|", $tangle_c_activation[$i]["neighbor00s"]).'/iu';
                $reg_c_parent00s = '/'.join("|", $tangle_c_activation[$i]["parent00s"]).'/iu';

                if($synapse_c_key != ""){
                    if (strpos($content, $synapse_c_key) !== false) {//synapse_c_key
                        //synapse_c_key
                            $activation_key = $this->get_key_activation(           
                                $content, 
                                $row_num
                            );
                            $neuron_c_activation += $activation_key;
                            $tangle_c_activation[$i] = $this->extend_c_tangle_c_activation(
                                $tree,
                                $row_num,
                                $tangle_c_activation[$i]
                            );
                    } else {//not_synapse_c_key
                        if(preg_match(
                            $reg_c_parent00s,
                            $content,
                            $parent00s_1
                        )){//parent
                            $parent00s_c_activation += 3;
                        } else {//neighbor_x_child_x_nothing
                            if(preg_match(
                                $reg_c_child00s,
                                $content,
                                $child00s_1
                            )){//child
                                $child00s_c_activation += 2;
                            } else {//neighbor_x_nothing
                                if(preg_match(
                                    $reg_c_neighbor00s,
                                    $content,
                                    $neighbor00s_1
                                )){//neighbor
                                    $neighbor00s_c_activation += 1;
                                } else {//nothing
                                }
                            } 
                        }
                    }
                }
            }
            $row_num++;
        }

        $sum = $parent00s_c_activation + $neighbor00s_c_activation + $child00s_c_activation;
        if($sum > 30){
            if($neuron_c_activation < 5){
                $neuron_c_activation += 10;
            } else {
                $neuron_c_activation += 30;
            }
        } else {
            $neuron_c_activation += $sum;
        }

        if($neuron_c_activation > 0){
            $response = array(
                "neuron" => array(
                    "neuron_c_activation" => $neuron_c_activation, 
                    "neuron_c_id" => $neuron_id
                ),
                "tangle" => $tangle_c_activation
                //"tangle_c_activation" => $tangle_c_activation #remove
            );
            return $response;
        } else {
            return null;
        }
    }
    protected function extend_c_tangle_c_activation (
        $tree,
        $row_num,
        $tangle_c_activation
    ){
        $parent00s_c_new = $this->get_og_c_parent_c_verified(
            $tree, 
            $row_num
        );
        $child00s_c_new = $this->get_c_og_c_child00s_c_verified(
            $tree,
            $row_num
        );
        $neighbour00s_c_new = $this->get_c_og_c_neighbour00s(
            $tree,
            $row_num
        );

        $tangle_c_activation["child00s"] = $this->collect_c_unique_c_array(
            $tangle_c_activation["child00s"], 
            $child00s_c_new
        ); 
        $tangle_c_activation["neighbor00s"] = $this->collect_c_unique_c_array(
            $tangle_c_activation["neighbor00s"], 
            $neighbour00s_c_new
        ); 
        $tangle_c_activation["parent00s"] = $this->collect_c_unique_c_array(
            $tangle_c_activation["parent00s"], 
            $parent00s_c_new
        );

        return $tangle_c_activation;
    }
}