<?php
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/load_neuron_tree.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_row_depth.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_pos_activation.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/get_key_activation.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/functions/collect_L_unique_L_array.php";

include $_SERVER['DOCUMENT_ROOT']."/php/units/brain/get_L_og_L_child00s_L_verified.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/brain/get_L_og_L_neighbour00s.php";
include $_SERVER['DOCUMENT_ROOT']."/php/units/brain/get_og_L_parent_L_verified.php";


trait complete_L_tangle_L_activation {

    use get_L_og_L_child00s_L_verified;
    use get_L_og_L_neighbour00s;
    use get_og_L_parent_L_verified;
    use collect_L_unique_L_array;

    use get_row_depth;
    use get_pos_activation;
    use get_key_activation;

    use load_neuron_tree;


    protected function complete_L_tangle_L_activation(
        $tangle_L_activation,
        $graph,
        $neuron
    ){
        $neuron_id = str_replace(".json", "", $neuron);
        $tags_array = array(); // tag // the most depth space 
        
        $neuron_L_activation = 0;

        $parent00s_L_activation = 0;
        $child00s_L_activation = 0;
        $neighbor00s_L_activation = 0;

        $tree = $this->load_neuron_tree($graph.$neuron, false);

        $row_num = 0;
        foreach($tree as $og){
            $content = $og["content"];

            for ($i = 0; $i < count($tangle_L_activation); $i++) { 
                $synapse_L_key = $tangle_L_activation[$i]["synapse"];
                
                $reg_L_synapse_L_key = '/'.$synapse_L_key.'/iu';
                $reg_L_child00s = '/'.join("|", $tangle_L_activation[$i]["child00s"]).'/iu';
                $reg_L_neighbor00s = '/'.join("|", $tangle_L_activation[$i]["neighbor00s"]).'/iu';
                $reg_L_parent00s = '/'.join("|", $tangle_L_activation[$i]["parent00s"]).'/iu';

                if($synapse_L_key != ""){
                    if(preg_match(
                        $reg_L_synapse_L_key,
                        $content,
                        $finded
                    ) != false){//synapse_L_key
                            $activation_key = $this->get_key_activation(           
                                $content, 
                                $row_num
                            );
                            $neuron_L_activation += $activation_key;
                            $tangle_L_activation[$i] = $this->extend_L_tangle_L_activation(
                                $tree,
                                $row_num,
                                $tangle_L_activation[$i]
                            );
                    } else {//not_synapse_L_key
                        if(preg_match(
                            $reg_L_parent00s,
                            $content,
                            $parent00s_1
                        )){//parent
                            $parent00s_L_activation += 3;
                        } else {//neighbor_x_child_x_nothing
                            if(preg_match(
                                $reg_L_child00s,
                                $content,
                                $child00s_1
                            )){//child
                                $child00s_L_activation += 2;
                            } else {//neighbor_x_nothing
                                if(preg_match(
                                    $reg_L_neighbor00s,
                                    $content,
                                    $neighbor00s_1
                                )){//neighbor
                                    $neighbor00s_L_activation += 1;
                                } else {//nothing
                                }
                            } 
                        }
                    }
                }
            }
            $row_num++;
        }

        $sum = $parent00s_L_activation + $neighbor00s_L_activation + $child00s_L_activation;
        if($sum > 30){
            if($neuron_L_activation < 5){
                $neuron_L_activation += 10;
            } else {
                $neuron_L_activation += 30;
            }
        } else {
            $neuron_L_activation += $sum;
        }

        if($neuron_L_activation > 0){
            $response = array(
                "neuron" => array(
                    "neuron_L_activation" => $neuron_L_activation, 
                    "neuron_L_id" => $neuron_id,
                    "time_L_last_edit" => filemtime($graph.$neuron)
                ),
                "tangle" => $tangle_L_activation
                //"tangle_L_activation" => $tangle_L_activation #remove
            );
            return $response;
        } else {
            return null;
        }
    }
    protected function extend_L_tangle_L_activation (
        $tree,
        $row_num,
        $tangle_L_activation
    ){
        $parent00s_L_new = $this->get_og_L_parent_L_verified(
            $tree, 
            $row_num
        );
        $child00s_L_new = $this->get_L_og_L_child00s_L_verified(
            $tree,
            $row_num
        );
        $neighbour00s_L_new = $this->get_L_og_L_neighbour00s(
            $tree,
            $row_num
        );

        $tangle_L_activation["child00s"] = $this->collect_L_unique_L_array(
            $tangle_L_activation["child00s"], 
            $child00s_L_new
        ); 
        $tangle_L_activation["neighbor00s"] = $this->collect_L_unique_L_array(
            $tangle_L_activation["neighbor00s"], 
            $neighbour00s_L_new
        ); 
        $tangle_L_activation["parent00s"] = $this->collect_L_unique_L_array(
            $tangle_L_activation["parent00s"], 
            $parent00s_L_new
        );

        return $tangle_L_activation;
    }
}