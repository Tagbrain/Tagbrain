<?php

trait get_c_og_c_child00s_c_verified {

    protected function get_c_og_c_child00s_c_verified(
        $tree, 
        $parent_i
    ){
        $child00s = array();
        $parent_c_depth = $tree[$parent_i]["depth"];

        for ($i = $parent_i + 1; $i < count($tree); $i++) {
            $outgrowth = $tree[$i];
            if($outgrowth["depth"] > $parent_c_depth){
                //it_c_child
                if($parent_c_depth + 1 == $outgrowth["depth"]){
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