<?php
include_once $_SERVER['DOCUMENT_ROOT']."/php/units/functions/load_neuron_tree.php";

trait get_c_microfeatures_c_format_c_parent_line_child_line {
    use load_neuron_tree;
    protected function get_c_child_c_from_current($outgrowths, $parent_pos){
        $parent_depth = $outgrowths[$parent_pos]["depth"];
        $current_pos = $parent_pos + 1;
        $curren_depth = $outgrowths[$current_pos]["depth"];
        if($curren_depth > $parent_depth){
            return array(
                "content" => $outgrowths[$current_pos]["content"],
                "depth" => 1
            );
        } else {
            return "0";
        }
    }
    protected function get_c_microfeatures_c_format_c_parent_line_child_line($neuron_path, $neuron_id, $body_regexp){
        $outgrowths = $this->load_neuron_tree($neuron_path, false);
        $microfeature00s_L_obj = array(
            "neuron_id" => $neuron_id,
            "tree_L_microfeature00s" => array(),
            "key_rows" => array(),
            "synapse_c_main" => $outgrowths[0]["content"],
            "count" => 0
        );
        $row_num = 0;

        foreach($outgrowths as $outgrowth){

            //for_regexp
            $current = $outgrowth["content"];
            $regexp = '/'.$body_regexp.'/iu';
            preg_match_all(
                $regexp,
                $current,
                $matches
            );

            if(count($matches[0]) > 0){//word_L_is_finded
                array_push(
                    $microfeature00s_L_obj["tree_L_microfeature00s"], 
                    //microfeature
                    array(
                        "content" => $outgrowth["content"],
                        "depth" => 0,
                    )
                );
               
                array_push(
                    $microfeature00s_L_obj["key_rows"], 
                    $row_num
                );
            } else {//
            }
            $row_num++;
        }

        $microfeature00s_L_obj["count"] = count($microfeature00s_L_obj["tree_L_microfeature00s"]);
        if($microfeature00s_L_obj["count"] != 0){
            return $microfeature00s_L_obj;
        } else {
            return false;
        }
        
        return $microfeature00s_L_obj;
    }

}