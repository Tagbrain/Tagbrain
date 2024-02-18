<?php

trait get_L_og_L_child00s_L_verified {

    protected function get_L_og_L_child00s_L_verified(
        $tree, 
        $parent_i
    ){
        $child00s = array();
        $parent_L_depth = $tree[$parent_i]["depth"];

        for ($i = $parent_i + 1; $i < count($tree); $i++) {
            $outgrowth = $tree[$i];
            if($outgrowth["depth"] > $parent_L_depth){
                //it_L_child
                if($parent_L_depth + 1 == $outgrowth["depth"]){
                    array_push($child00s, $outgrowth["content"]);
                } else {
                    continue;
                }
            } else {
                //it is not child
                break;
            }
        }
        return $child00s;
    }
    
}