<?php
include_once $_SERVER['DOCUMENT_ROOT']."/php/units/functions/load_neuron_tree.php";

trait get_c_microfeatures_c_format_c_parent_line_child_line {
    use load_neuron_tree;
    protected function get_c_parent_c_from_current($outgrowths, $pos_child){
        $child_depth = $outgrowths[$pos_child]["depth"];
        $current_pos = $pos_child - 1;
        while ($current_pos >= 0){
            $curren_depth = $outgrowths[$current_pos]["depth"];
            if($curren_depth < $child_depth){
                return $outgrowths[$current_pos]["content"];
            } else {
                $current_pos--;
                continue;
            }
        }
        return "0";
    }
    protected function get_c_child_c_from_current($outgrowths, $parent_pos){
        $parent_depth = $outgrowths[$parent_pos]["depth"];
        $current_pos = $parent_pos + 1;
        $curren_depth = $outgrowths[$current_pos]["depth"];
        if($curren_depth > $parent_depth){
            return $outgrowths[$current_pos]["content"];
        } else {
            return "0";
        }
    }
    protected function get_c_microfeatures_c_format_c_parent_line_child_line($neuron_path, $neuron_id, $body_regexp){
        $outgrowths = $this->load_neuron_tree($neuron_path, false);
        $microfeature_c_obj = array(
            "neuron_id" => $neuron_id,
            "microfeatures" => array(),
            "key_rows" => array(),
            "synapse_c_main" => $outgrowths[0]["content"]
        );

        foreach($outgrowths as $outgrowth){
            $current = $outgrowth["content"];

            $regexp = '/'.$body_regexp.'/iu';

            preg_match_all(
                $regexp,
                $current,
                $matches
            );
            if(count($matches[0]) > 0){
                if($row_num > 0){
                    $parent = $this->get_c_parent_c_from_current($outgrowths, $row_num);
                    if($parent == "0"){
                        $child = $this->get_c_child_c_from_current($outgrowths, $row_num);
                        if($child == "0"){
                            $microfeature = $current;
                        } else {
                            $microfeature = $current." -> ".$child;
                        }
                    } else {
                        $microfeature = $parent." -> ".$current;
                    }
                    array_push($microfeature_c_obj["microfeatures"], $microfeature);
                    array_push($microfeature_c_obj["key_rows"], $outgrowth["row"]);
                    $row_num++;
                    continue;
                } else {
                    array_push($microfeature_c_obj["key_rows"], $outgrowth["row"]);
                    $row_num++;
                    continue;
                }
            } else {
                $row_num++;
                continue;
            }
        }
        $key_synapse = count($microfeature_c_obj["key_rows"]);
        if($key_synapse != 0){
            $microfeature_c_obj["count"] = $key_synapse;
            return $microfeature_c_obj;
        } else {
            return false;
        }
        
        return $microfeature_c_obj;
    }

}