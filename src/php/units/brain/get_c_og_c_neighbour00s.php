<?php
include $_SERVER['DOCUMENT_ROOT']."/php/units/brain/get_c_truncus_c_target_c_outgrowth.php";

trait get_c_og_c_neighbour00s {

    use get_c_truncus_c_target_c_outgrowth;

    protected function get_c_og_c_neighbour00s(
        $tree, 
        $cur_i
    ){
        $neighbor00s = array();
        $parent_c_current = $this->get_c_truncus_c_target_c_outgrowth($tree, $cur_i);

        $og_c_depth_x_current = $tree[$cur_i]["depth"];
        if($parent_c_current != false) {
            $parent_c_depth = $tree[$parent_c_current["index"]]["depth"];
            for($i = $parent_c_current['index'] + 1; $i < count($tree); $i++) {
                $og = $tree[$i];
                if($og["depth"] <= $parent_c_depth) {
                    break;
                } else if($og_c_depth_x_current == $og["depth"]) {
                    if($i != $cur_i) {
                        array_push($neighbor00s, $og["content"]);
                    }
                }
            }
        }
        
        return $neighbor00s;
    }
}