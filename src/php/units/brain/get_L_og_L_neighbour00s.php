<?php
include $_SERVER['DOCUMENT_ROOT']."/php/units/brain/get_L_truncus_L_target_L_outgrowth.php";

trait get_L_og_L_neighbour00s {

    use get_L_truncus_L_target_L_outgrowth;

    protected function get_L_og_L_neighbour00s(
        $tree, 
        $cur_i
    ){
        $neighbor00s = array();
        $parent_L_current = $this->get_L_truncus_L_target_L_outgrowth($tree, $cur_i);

        $og_L_depth_x_current = $tree[$cur_i]["depth"];
        if($parent_L_current != false) {
            $parent_L_depth = $tree[$parent_L_current["index"]]["depth"];
            for($i = $parent_L_current['index'] + 1; $i < count($tree); $i++) {
                $og = $tree[$i];
                if($og["depth"] <= $parent_L_depth) {
                    break;
                } else if($og_L_depth_x_current == $og["depth"]) {
                    if($i != $cur_i) {
                        array_push($neighbor00s, $og["content"]);
                    }
                }
            }
        }
        
        return $neighbor00s;
    }
}