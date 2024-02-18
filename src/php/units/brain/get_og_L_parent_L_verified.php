<?php

trait get_og_L_parent_L_verified {

    protected function get_og_L_parent_L_verified(
        $tree, 
        $cur_L_i
    ){
        $parent00s = array();
        $cur_depth = $tree[$cur_L_i]["depth"];
        for ($i = $cur_L_i; $i >= 0; $i--) {
            $og = $tree[$i];
            if ($og["depth"] < $cur_depth) {//that is parent
                $parent00s[] = $og["content"];
                break;
            }
        }
        return $parent00s;
    }
}